import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Copy, RefreshCcw, CheckCircle2 } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    specials: true,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) charset += "0123456789";
    if (options.specials) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!charset) {
      setPassword("Sélectionnez une option");
      return;
    }

    let newPassword = "";
    const charsetLength = charset.length;

    // Ensure cryptographically strong random values
    const randomArray = new Uint32Array(length);
    window.crypto.getRandomValues(randomArray);

    for (let i = 0; i < length; i++) {
      newPassword += charset[randomArray[i] % charsetLength];
    }

    setPassword(newPassword);
    setCopied(false);
  }, [length, options]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (!password || password === "Sélectionnez une option") return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const CheckboxItem = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <label className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer group">
      <span className="text-neutral-300 group-hover:text-white transition-colors">{label}</span>
      <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 \${checked ? 'bg-emerald-500 border-emerald-500' : 'bg-neutral-950 border-neutral-700 border'}`}>
        {checked && <CheckCircle2 className="w-4 h-4 text-white" />}
      </div>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    </label>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans md:pt-20 pt-16 flex flex-col relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 w-full max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-[2.5rem] p-8 shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-500/10 text-emerald-500 p-3 rounded-2xl">
              <KeyRound className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Mot de passe</h1>
              <p className="text-neutral-400">Générateur sécurisé</p>
            </div>
          </div>

          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-neutral-950 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between gap-4">
              <input
                type="text"
                value={password}
                readOnly
                className="bg-transparent w-full text-2xl font-mono text-emerald-400 outline-none truncate"
                placeholder="Mot de passe"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={generatePassword}
                  className="p-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-all"
                  title="Générer un nouveau mot de passe"
                >
                  <RefreshCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className={`p-3 rounded-xl transition-all flex items-center gap-2 \${
                    copied 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                  }`}
                  title="Copier"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-neutral-300 font-medium">Longueur</label>
                <span className="text-emerald-400 font-mono text-xl bg-emerald-500/10 px-3 py-1 rounded-lg">
                  {length}
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <CheckboxItem label="Majuscules (A-Z)" checked={options.uppercase} onChange={() => toggleOption("uppercase")} />
              <CheckboxItem label="Minuscules (a-z)" checked={options.lowercase} onChange={() => toggleOption("lowercase")} />
              <CheckboxItem label="Chiffres (0-9)" checked={options.numbers} onChange={() => toggleOption("numbers")} />
              <CheckboxItem label="Symboles (!@#$)" checked={options.specials} onChange={() => toggleOption("specials")} />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
