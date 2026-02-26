import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

export default function Minuteur() {
  const [isActive, setIsActive] = useState(false);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const totalTimeInSeconds =
    (parseInt(hours) || 0) * 3600 +
    (parseInt(minutes) || 0) * 60 +
    (parseInt(seconds) || 0);

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setTime(totalTimeInSeconds);
    }
  }, [hours, minutes, seconds, isActive, totalTimeInSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      // Play sound when done
      const audio = new Audio("/assets/bell.mp3");
      audio.play().catch(e => console.error(e));
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggle = () => {
    if (time > 0) setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setTime(totalTimeInSeconds);
  };

  const formatTime = (t: number) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const InputField = ({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (e: any) => void }) => (
    <input
      type="number"
      min="0"
      max="59"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-neutral-900 border border-neutral-700 text-center text-xl p-3 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono placeholder:text-neutral-600 disabled:opacity-50"
      disabled={isActive}
    />
  );

  return (
    <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl flex flex-col h-full max-h-[500px]">
      <div className="flex items-center gap-3 mb-8 text-neutral-300">
        <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
          <Timer className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold">Minuteur</h2>
      </div>

      <div className="flex gap-4 mb-10 w-full max-w-xs mx-auto">
        <InputField placeholder="00" value={hours} onChange={(e) => setHours(e.target.value)} />
        <InputField placeholder="00" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
        <InputField placeholder="00" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-6xl sm:text-7xl font-bold font-mono tracking-tight tabular-nums mb-12 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
          {formatTime(time)}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            disabled={time === 0 && !isActive}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed \${
              isActive 
                ? "bg-neutral-800 text-white hover:bg-neutral-700" 
                : "bg-purple-600 text-white shadow-lg shadow-purple-600/25 hover:bg-purple-500 hover:scale-105"
            }`}
          >
            {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
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
