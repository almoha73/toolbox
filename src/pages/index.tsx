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
import Link from "next/link";

// importer des fonts de Google Fonts

import { Inter } from "next/font/google";
import { Sedgwick_Ave_Display } from "next/font/google";

const sedgwick = Sedgwick_Ave_Display({
	subsets: ["latin"],
	variable: "--font-sedgwick",
	weight: "400",
});

export default function Home() {
	return (
		<div className="w-full min-h-screen bg-amber-700 flex items-center justify-center">
			<div className="w-11/12 h-[500px] border-4 shadow-lg rounded-2xl bg-yellow-100">
				<h1
					className={`${sedgwick.variable} font-sedgwick  text-center mt-4 text-4xl text-amber-700`}
				>
					Toolbox
				</h1>

				<div className="w-11/12 flex gap-8 flex-wrap mt-4 p-2 items-center justify-center">
					<Link href="/meteo" className="border-2 shadow-lg p-1 rounded-xl bg-pink-100">
						<FontAwesomeIcon
							icon={faCloudSunRain}
							className="text-yellow-500 w-14 h-14 "
						/>
					</Link>

					<Link
						href="/TodoListe"
						className="border-2 shadow-lg p-1 rounded-xl bg-pink-100"
					>
						<FontAwesomeIcon icon={faList} className="shadow-lg w-14 h-14 " />
					</Link>

					<Link
						href="/pomodoro"
						className="border-2 shadow-lg p-1 rounded-xl bg-pink-100"
					>
						<FontAwesomeIcon
							icon={faStopwatch}
							className="text-blue-500 w-14 h-14 "
						/>
					</Link>

					<Link
						href="/PasswordGenerator"
						className="border-2 shadow-lg p-1 rounded-xl bg-pink-100"
					>
						<FontAwesomeIcon icon={faKey} className="text-red-500 w-14 h-14 " />
					</Link>

					<Link
						href="/MinuteurChronometre"
						className="border-2 shadow-lg p-1 rounded-xl bg-pink-100"
					>
						<FontAwesomeIcon
							icon={faClock}
							className="text-yellow-500 w-14 h-14 "
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
