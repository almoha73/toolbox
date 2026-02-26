import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, Play, Square, RotateCcw, Timer } from "lucide-react";

export default function Repos() {
	const [time, setTime] = React.useState(300); // Default to 5 min (300s)
	const [timeStart, setTimeStart] = React.useState(false);

	const buttons = [
		{ value: 300, display: "5 min" },
		{ value: 600, display: "10 min" },
		{ value: 900, display: "15 min" },
	];

	const toggleTimer = () => setTimeStart(!timeStart);

	useEffect(() => {
		let bell: HTMLAudioElement | null = null;
		if (typeof window !== "undefined") {
			bell = new Audio("/assets/bell.mp3");
		}

		const interval = setInterval(() => {
			if (timeStart) {
				setTime((prevTime) => {
					if (prevTime > 0) {
						return prevTime - 1;
					} else {
						bell?.play().catch(e => console.error("Audio play failed:", e));
						setTimeStart(false);
						return 0;
					}
				});
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [timeStart]);

	const resetTimer = () => {
		setTime(300);
		setTimeStart(false);
	};

	const formatTime = (totalSeconds: number) => {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans md:pt-20 pt-16 flex flex-col relative overflow-hidden">
			<div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
			<Navbar />

			<main className="flex-1 flex flex-col items-center justify-center p-6 z-10 w-full max-w-2xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="w-full bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-[3rem] p-10 flex flex-col items-center shadow-2xl relative overflow-hidden"
				>
					<div className="absolute top-0 left-0 w-full h-1 bg-neutral-800">
						<motion.div
							className="h-full bg-indigo-500"
							initial={{ width: "0%" }}
							animate={{ width: `${timeStart ? 100 : 0}%` }}
							transition={{ duration: timeStart ? time : 0.3, ease: "linear" }}
						/>
					</div>

					<div className="flex items-center gap-3 mb-10 text-indigo-500">
						<Coffee className="w-8 h-8" />
						<h1 className="text-3xl font-bold text-white tracking-tight">Temps de repos</h1>
					</div>

					<div className="flex flex-wrap justify-center gap-3 mb-12">
						{buttons.map((button, index) => (
							<button
								key={index}
								onClick={() => {
									setTime(button.value);
									setTimeStart(false);
								}}
								className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 \${
                  time === button.value && !timeStart
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                }`}
							>
								{button.display}
							</button>
						))}
					</div>

					<div className="relative mb-12 group">
						<div className="absolute inset-0 bg-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
						<motion.div
							animate={{ scale: timeStart ? [1, 1.02, 1] : 1 }}
							transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
							className="text-8xl md:text-[8rem] font-bold tabular-nums tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent relative"
						>
							{formatTime(time)}
						</motion.div>
					</div>

					<div className="flex items-center gap-6 mb-8">
						<button
							onClick={toggleTimer}
							className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 \${
                timeStart 
                  ? "bg-neutral-800 text-white hover:bg-neutral-700 hover:scale-105" 
                  : "bg-indigo-500 text-white hover:bg-indigo-400 hover:scale-105 shadow-xl shadow-indigo-500/20"
              }`}
						>
							{timeStart ? (
								<>
									<Square className="w-5 h-5 fill-current" />
									Pause
								</>
							) : (
								<>
									<Play className="w-5 h-5 fill-current" />
									Démarrer
								</>
							)}
						</button>
						<button
							onClick={resetTimer}
							className="flex items-center gap-2 p-4 rounded-2xl font-semibold bg-neutral-800/50 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all duration-300 hover:scale-105"
							aria-label="Réinitialiser"
						>
							<RotateCcw className="w-6 h-6" />
						</button>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="mt-8"
				>
					<Link
						href="/pomodoro"
						className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500/10 text-rose-400 font-medium hover:bg-rose-500/20 transition-all duration-300 hover:-translate-y-1"
					>
						<Timer className="w-5 h-5" />
						Passer au mode Pomodoro
					</Link>
				</motion.div>
			</main>
		</div>
	);
}
