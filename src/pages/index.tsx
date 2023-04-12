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

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-16">Boite à outil</h1>
      {/**Main grid avec 4 colonnes pour 4 grnads icônes en desktop et 3 et 2 avec des écrans plus petits */}
      <main className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center ">
            <div className="flex justify-between items-center w-11/12 ">
              <Link
                href="/TodoListe"
                className="flex justify-between items-center w-full"
              >
                <h2 className="xl:text-2xl font-bold">Todo Liste</h2>
                {/**icones pour todo liste */}
                <FontAwesomeIcon icon={faList} className="text-4xl" />
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center ">
            <div className="flex justify-between items-center w-11/12">
              <Link
                href="/meteo"
                className="flex justify-between items-center w-full"
              >
                <h2 className="text-2xl font-bold">Météo</h2>
                {/**icone pour meteo */}
                {<FontAwesomeIcon icon={faCloudSunRain} className="text-4xl" />}
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center ">
            <div className="flex justify-between items-center w-11/12">
              <Link
                href="/pomodoro"
                className="flex justify-between items-center w-full"
              >
                <h2 className="text-2xl font-bold">Pomodoro</h2>
                {/**icone pour meteo */}
                {<FontAwesomeIcon icon={faStopwatch} className="text-4xl" />}
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center ">
            <div className="flex justify-between items-center w-11/12">
              <Link
                href="/PasswordGenerator"
                className="flex justify-between items-center w-full"
              >
                <h2 className="text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden">
                  Générateur de mots de passe
                </h2>
                {/**icone pour meteo */}
                {<FontAwesomeIcon icon={faKey} className="text-4xl" />}
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center ">
            <div className="flex justify-between items-center w-11/12">
              <Link
                href="/MinuteurChronometre"
                className="flex justify-between items-center w-full"
              >
                <h2 className="text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden">
                  Minuteur/Chronomètre
                </h2>
                {/**icone pour meteo */}
                {<FontAwesomeIcon icon={faClock} className="text-4xl" />}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
