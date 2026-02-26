import Navbar from "@/components/Navbar";
import React from "react";
import { Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans md:pt-20 pt-16 flex flex-col relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 w-full max-w-2xl mx-auto">
        <div className="w-full bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="bg-sky-500/20 text-sky-400 p-4 rounded-full mb-6 relative">
              <div className="absolute inset-0 bg-sky-500/20 blur-xl rounded-full" />
              <Mail className="w-8 h-8 relative z-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Contactez-nous</h1>
            <p className="text-neutral-400">
              Une question, une suggestion ou une remarque sur la Toolbox ?
              N&apos;hésitez pas à nous envoyer un message.
            </p>
          </div>

          <div className="grid gap-6">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 rounded-xl px-5 py-4 outline-none transition-all placeholder:text-neutral-600"
                />
                <input
                  type="email"
                  placeholder="Adresse email"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 rounded-xl px-5 py-4 outline-none transition-all placeholder:text-neutral-600"
                />
              </div>
              <textarea
                rows={5}
                placeholder="Votre message..."
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 rounded-xl px-5 py-4 outline-none transition-all placeholder:text-neutral-600 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-xl px-6 py-4 font-semibold transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Envoyer le message
              </button>
            </form>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-neutral-400 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> contact@toolbox.fr
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Paris, France
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}