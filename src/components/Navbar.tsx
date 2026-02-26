import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
	ListTodo,
	Timer,
	CloudSun,
	KeyRound,
	Clock,
	Calculator,
	Menu,
	X,
	ChevronDown,
	Box
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Toolbox = [
	{
		name: "Todo-Liste",
		description: "Vous pouvez ajouter des tâches à faire",
		href: "/TodoListe",
		icon: ListTodo,
		color: "text-blue-500",
	},
	{
		name: "Pomodoro",
		description: "Vous pouvez gérer votre temps de travail",
		href: "/pomodoro",
		icon: Timer,
		color: "text-rose-500",
	},
	{
		name: "Météo",
		description: "Vous pouvez consulter la météo",
		href: "/meteo",
		icon: CloudSun,
		color: "text-amber-500",
	},
	{
		name: "Générateur",
		description: "Vous pouvez générer des mots de passe",
		href: "/PasswordGenerator",
		icon: KeyRound,
		color: "text-emerald-500",
	},
	{
		name: "Minuteur",
		description: "Vous pouvez gérer votre temps",
		href: "/MinuteurChronometre",
		icon: Clock,
		color: "text-purple-500",
	},
	{
		name: "Calculatrice",
		description: "Vous pouvez faire des calculs",
		href: "/calculatrice",
		icon: Calculator,
		color: "text-indigo-500",
	}
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className={classNames(
			"fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b border-transparent",
			scrolled
				? "bg-neutral-950/80 backdrop-blur-md border-neutral-800/50 shadow-lg shadow-neutral-900/20"
				: "bg-transparent"
		)}>
			<nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
				<div className="flex lg:flex-1">
					<Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
						<span className="sr-only">Toolbox</span>
						<div className="bg-indigo-500/10 text-indigo-400 p-2 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
							<Box className="h-6 w-6" />
						</div>
						<span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">Toolbox</span>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-400 hover:text-white transition-colors"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Ouvrir le menu</span>
						<Menu className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<Popover.Group className="hidden lg:flex lg:gap-x-12 items-center">
					<Link href="/" className={classNames(
						"text-sm font-semibold leading-6 transition-colors",
						router.pathname === "/" ? "text-indigo-400" : "text-neutral-300 hover:text-white"
					)}>
						Accueil
					</Link>

					<Popover className="relative">
						<Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-neutral-300 hover:text-white transition-colors outline-none">
							Outils
							<ChevronDown className="h-4 w-4 flex-none text-neutral-500" aria-hidden="true" />
						</Popover.Button>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-2"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-2"
						>
							<Popover.Panel className="absolute -left-8 top-full mt-6 w-screen max-w-md overflow-hidden rounded-3xl bg-neutral-900/90 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 z-50">
								{({ close }) => (
									<div className="p-4 grid grid-cols-2 gap-2">
										{Toolbox.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												onClick={() => close()}
												className="group relative flex flex-col gap-2 rounded-2xl p-4 hover:bg-neutral-800/50 transition-colors"
											>
												<div className={classNames(
													"flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-neutral-800/50 group-hover:bg-neutral-800 transition-colors"
												)}>
													<item.icon className={classNames("h-5 w-5", item.color)} aria-hidden="true" />
												</div>
												<div>
													<span className="block font-semibold text-neutral-200 group-hover:text-white transition-colors">
														{item.name}
														<span className="absolute inset-0" />
													</span>
													<p className="mt-1 text-xs text-neutral-500 line-clamp-1 group-hover:text-neutral-400 transition-colors">{item.description}</p>
												</div>
											</Link>
										))}
									</div>
								)}
							</Popover.Panel>
						</Transition>
					</Popover>
					<Link href="/contact" className={classNames(
						"text-sm font-semibold leading-6 transition-colors",
						router.pathname === "/contact" ? "text-indigo-400" : "text-neutral-300 hover:text-white"
					)}>
						Contact
					</Link>
				</Popover.Group>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<Link href="/login" className="text-sm font-semibold leading-6 text-neutral-300 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-neutral-800/50">
						Connexion <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</nav>
			<Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
				<div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-neutral-900 px-6 py-6 sm:max-w-sm ring-1 ring-white/10">
					<div className="flex items-center justify-between mb-8">
						<Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
							<div className="bg-indigo-500/10 text-indigo-400 p-2 rounded-xl">
								<Box className="h-6 w-6" />
							</div>
							<span className="text-xl font-bold text-white">Toolbox</span>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-neutral-400 hover:text-white"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Fermer le menu</span>
							<X className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-neutral-800">
							<div className="space-y-2 py-6">
								<Link
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-300 hover:bg-neutral-800 hover:text-white"
								>
									Accueil
								</Link>
								<Link
									href="/contact"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-300 hover:bg-neutral-800 hover:text-white"
								>
									Contact
								</Link>
								<Disclosure as="div" className="-mx-3">
									{({ open }) => (
										<>
											<Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-neutral-300 hover:bg-neutral-800 hover:text-white">
												Outils
												<ChevronDown
													className={classNames(open ? "rotate-180" : "", "h-5 w-5 flex-none")}
													aria-hidden="true"
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="mt-2 space-y-2">
												{[...Toolbox].map((item) => (
													<Disclosure.Button
														key={item.name}
														as="a"
														href={item.href}
														className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-neutral-400 hover:bg-neutral-800 hover:text-white"
													>
														<div className="flex items-center gap-3">
															<item.icon className={classNames("h-5 w-5", item.color)} />
															{item.name}
														</div>
													</Disclosure.Button>
												))}
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							</div>
							<div className="py-6">
								<Link
									href="/login"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-300 hover:bg-neutral-800 hover:text-white"
								>
									Connexion
								</Link>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}
