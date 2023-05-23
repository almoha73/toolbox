import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
// icone pour meteo
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
//icone pour pomodoro
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
//icone pour password generator
import { faKey } from "@fortawesome/free-solid-svg-icons";
//icone pour minuteur et chronomètre
import { faClock } from "@fortawesome/free-solid-svg-icons";
//icone pour calculatrice
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


export default function Home() {
	return (
		<div className="w-full min-h-screen metallic-dark-bg flex items-center justify-center">
			<div className="w-11/12 flex flex-col mx-auto border-4 shadow-lg rounded-2xl metallic-bg">
				<h1
					className={` font-slab text-center mt-4 text-4xl text-gray-900 font-bold`}
				>
					Toolbox
				</h1>

				<div className="flex gap-8 flex-wrap mt-4 p-2 items-center justify-center">
					<Link href="/meteo" className="border-2 shadow-lg  rounded-xl bg-gray-100 flex flex-col items-center gap-2 p-2">
						<FontAwesomeIcon
							icon={faCloudSunRain}
							className="text-yellow-500 w-14 h-14 "
						/>
						<span>Météo</span>
					</Link>

					<Link
						href="/TodoListe"
						className="border-2 shadow-lg  rounded-xl bg-gray-100 flex flex-col items-center gap-2 p-2"
					>
						<FontAwesomeIcon icon={faList} className="shadow-lg w-14 h-14 " />
						<span>Todo-Liste</span>
					</Link>

					<Link
						href="/pomodoro"
						className="border-2 shadow-lg  rounded-xl bg-gray-100 flex flex-col items-center gap-2 p-2"
					>
						<FontAwesomeIcon
							icon={faStopwatch}
							className="text-blue-500 w-14 h-14 "
						/>
						<span>Pomodoro</span>
					</Link>

					<Link
						href="/PasswordGenerator"
						className="border-2 shadow-lg  rounded-xl bg-gray-100 flex flex-col items-center gap-2 p-2"
					>
						<FontAwesomeIcon icon={faKey} className="text-red-500 w-14 h-14 " />
						<span>Générateur de mots de passe</span>
					</Link>

					<Link
						href="/MinuteurChronometre"
						className="border-2 shadow-lg  rounded-xl bg-gray-100 flex flex-col items-center gap-2 p-2"
					>
						<FontAwesomeIcon
							icon={faClock}
							className="text-yellow-500 w-14 h-14 "
						/>
						<span>Chronomètre / Minuteur</span>
					</Link>

					<Link
						href="/calculatrice"
						className="border-2 shadow-lg  rounded-xl bg-gray-100 flex flex-col items-center gap-2 p-2"
					>
						<FontAwesomeIcon
							icon={faCalculator}
							className="text-green-500 w-14 h-14 "
						/>
						<span>Calculatrice</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
