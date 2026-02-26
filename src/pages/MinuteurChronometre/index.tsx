import Navbar from "@/components/Navbar";
import React from "react";
import Minuteur from "../../components/Minuteur";
import Chronometre from "../../components/Chronometre";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const Timer = () => {
	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans md:pt-20 pt-16 flex flex-col relative overflow-hidden">
			<div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
			<Navbar />

			<main className="flex-1 w-full max-w-5xl mx-auto p-6 z-10">
				<div className="flex items-center gap-4 mb-12 mt-4 text-purple-400">
					<Clock className="w-8 h-8" />
					<h1 className="text-3xl font-bold text-white tracking-tight">Gestion du temps</h1>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="grid md:grid-cols-2 gap-8"
				>
					<Minuteur />
					<Chronometre />
				</motion.div>
			</main>
		</div>
	);
};

export default Timer;
