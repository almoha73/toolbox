import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

export default function Chronometre() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    startTimeRef.current = null;
  };

  const formatTime = (t: number) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now() - time * 1000;
      }
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - startTimeRef.current!) / 1000));
      }, 1000);
    } else {
      startTimeRef.current = null;
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-[2rem] p-8 shadow-2xl flex flex-col h-full items-center text-center max-h-[500px]">
      <div className="self-start flex items-center gap-3 mb-12 text-neutral-300">
        <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
          <Clock className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold">Chronomètre</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="text-6xl sm:text-7xl font-bold font-mono tracking-tight tabular-nums mb-16 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
          {formatTime(time)}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={isRunning ? stop : start}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 \${
              isRunning 
                ? "bg-neutral-800 text-white hover:bg-neutral-700 hover:scale-105" 
                : "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 hover:scale-105"
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>

          <button
            onClick={reset}
            className="p-4 rounded-2xl bg-neutral-800/50 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all hover:scale-105"
            aria-label="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
