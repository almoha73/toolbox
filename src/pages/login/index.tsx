import Navbar from "@/components/Navbar";
import React from "react";
import { LogIn, Github, Mail } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans md:pt-20 pt-16 flex flex-col relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 w-full max-w-md mx-auto">
        <div className="w-full bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-500/20 p-4 rounded-full text-indigo-400 mb-6">
              <LogIn className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Bienvenue</h1>
            <p className="text-neutral-400 text-center">Connectez-vous à votre espace personnel</p>
          </div>

          <form className="space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="email"
                placeholder="Adresse email"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-neutral-600"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-neutral-600"
              />
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4 py-3 font-semibold transition-all shadow-lg shadow-indigo-600/20 text-center">
              Se connecter
            </button>
          </form>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-900 text-neutral-500">Ou continuer avec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors font-medium">
              <Github className="w-5 h-5" />
              Github
            </button>
            <button className="flex items-center justify-center gap-2 p-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors font-medium">
              <Mail className="w-5 h-5" />
              Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}