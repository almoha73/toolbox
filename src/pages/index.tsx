import Link from "next/link";
import { motion } from "framer-motion";
import { CloudSun, ListTodo, Timer, KeyRound, Clock, Calculator } from "lucide-react";

export default function Home() {
	const tools = [
		{ name: "Météo", href: "/meteo", icon: CloudSun, color: "text-amber-500", bg: "bg-amber-500/10" },
		{ name: "Todo-Liste", href: "/TodoListe", icon: ListTodo, color: "text-blue-500", bg: "bg-blue-500/10" },
		{ name: "Pomodoro", href: "/pomodoro", icon: Timer, color: "text-rose-500", bg: "bg-rose-500/10" },
		{ name: "Générateur de mot de passe", href: "/PasswordGenerator", icon: KeyRound, color: "text-emerald-500", bg: "bg-emerald-500/10" },
		{ name: "Chronomètre / Minuteur", href: "/MinuteurChronometre", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
		{ name: "Calculatrice", href: "/calculatrice", icon: Calculator, color: "text-indigo-500", bg: "bg-indigo-500/10" },
	];

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } },
	};

	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-indigo-500/30 font-sans flex items-center justify-center relative overflow-hidden p-6">
			<div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-500/20 to-transparent blur-3xl pointer-events-none" />
			<div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

			<div className="w-full max-w-5xl z-10">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="text-center mb-16"
				>
					<h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">
						Toolbox
					</h1>
					<p className="text-lg text-neutral-400 max-w-2xl mx-auto">
						Une collection d&apos;outils essentiels conçus pour simplifier votre quotidien.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{tools.map((tool) => (
						<motion.div key={tool.name} variants={item}>
							<Link
								href={tool.href}
								className="group relative flex flex-col p-8 bg-neutral-900/50 hover:bg-neutral-800/80 backdrop-blur-sm border border-neutral-800 hover:border-neutral-700 rounded-3xl transition-all duration-300 overflow-hidden"
							>
								<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								<div
									className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 \${tool.bg} shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]`}
								>
									<tool.icon className={`w-7 h-7 \${tool.color}`} strokeWidth={1.5} />
								</div>
								<h2 className="text-xl font-semibold mb-2 text-neutral-200 group-hover:text-white transition-colors">
									{tool.name}
								</h2>
								<div className="flex-1" />
								<div className="mt-4 flex items-center text-sm font-medium text-neutral-500 group-hover:text-neutral-300 transition-colors">
									Ouvrir l&apos;outil
									<svg
										className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
}
