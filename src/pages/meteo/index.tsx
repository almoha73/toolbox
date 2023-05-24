import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { translateWeatherDescription } from "../../utils/weatherUtils";

// page meteo en utilisant typescript

interface WeatherItem {
  temperature: number | null;
  heure: number | null;
  description: string | undefined;
  icon: string | null;
}

const defaultWeatherItem: WeatherItem = {
  heure: null,
  temperature: null,
  description: undefined,
  icon: null,
};

const initialSixHourWeather: WeatherItem[] = Array(6).fill(defaultWeatherItem);

// interface meteo de 8 jours
interface Weather {
  tempMin: number | null;
  tempMax: number | null;
  jour: number | null;
  description: string | undefined;
  icon: string | null;
}

const defaultWeather: Weather = {
  tempMin: null,
  tempMax: null,
  jour: null,
  description: undefined,
  icon: null,
};

const initialWeather: Weather[] = Array(8).fill(defaultWeather);

const Meteo = () => {
  const [city, setCity] = useState(""); // ville de l'utilisateur
  const [temperature, setTemperature] = useState<number | null>(null); // température de la ville de l'utilisateur
  const [lat, setLat] = useState<number | null>(null); // latitude de la ville de l'utilisateur
  const [lon, setLon] = useState<number | null>(null); // longitude de la ville de l'utilisateur
  let [description, setDescription] = useState<string | undefined>(""); // description de la météo de la ville de l'utilisateur
  const [icon, setIcon] = useState(null); // icone de la météo de la ville de l'utilisateur
  const [searchedCity, setSearchedCity] = useState(""); // ville tapée dans le champ de recherche
  const [lastSearchedCity, setLastSearchedCity] = useState(""); // dernière ville tapée dans le champ de recherche
  const [searchedWeather, setSearchedWeather] = useState<{
    // météo de la ville tapée dans le champ de recherche
    temperature: number | null;
    description: string | undefined;
    icon: string | null;
    heure: number | null;
  }>({
    temperature: null,
    description: undefined,
    icon: null,
    heure: null,
  });
  const [sixHourWeather, setSixHourWeather] = useState<WeatherItem[]>(
    initialSixHourWeather
  );
  const [weather, setWeather] = useState<Weather[]>(initialWeather);

  // Récupération de la météo de la ville tapée dans le champ de recherche
  const fetchSearchedWeather = async () => {
    const apiKey = "1e13ef02fc68057b2d90d17a5fbe1a22";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);

      setSearchedWeather({
        temperature: data.main.temp.toFixed(1),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        heure: new Date(data.dt * 1000).getHours(),
      });
      setLastSearchedCity(
        searchedCity.charAt(0).toUpperCase() + searchedCity.slice(1)
      );
      setSearchedCity("");
    } catch (error) {
      console.error(error);
    }
  };

  // Récupération de la ville de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setLat(position.coords.latitude);
        console.log(lat);
        setLon(position.coords.longitude);
        const apiKey = "1e13ef02fc68057b2d90d17a5fbe1a22";
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const data = await response.json();
        console.log(data);

        setCity(data[0]?.name);
      });
    } else {
      console.log(
        "La géolocalisation n'est pas prise en charge par votre navigateur."
      );
    }
  }, [lat, lon]);

  // Récupération des données météo locales de l'utilisateur
  useEffect(() => {
    const apiKey = "1e13ef02fc68057b2d90d17a5fbe1a22";
    const country = "FR";
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${country}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTemperature(data.current.temp.toFixed(1));
        setDescription(
          translateWeatherDescription(data.current.weather[0].description)
        );
        setIcon(data.current.weather[0].icon);
        const sixHourForecast = data.hourly.slice(0, 6).map((hour: any) => ({
          // convertir les millisecondes en heure locale ex: 20h54
          heure: new Date(hour.dt * 1000).getHours(),
          temperature: hour.temp.toFixed(1),
          description: hour.weather[0].description,
          icon: hour.weather[0].icon,
        }));

        setSixHourWeather(sixHourForecast);
        console.log(sixHourForecast);

        const dailyForecast = data.daily.slice(0, 8).map((day: any) => ({
          // convertir les millisecondes en jour de la semaine ex: lundi
          jour: new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
            weekday: "long",
          }),
          tempMin: day.temp.min.toFixed(1),
          tempMax: day.temp.max.toFixed(1),
          description: day.weather[0].description,
          icon: day.weather[0].icon,
        }));

        setWeather(dailyForecast);
        console.log(dailyForecast);
      })
      .catch((error) => console.error(error));
  }, [city, lat, lon]);

  console.log(description);

  return (
    <>
      <div className="w-full min-h-screen bg-gray-800 bg-gradient-to-br from-gray-500 via-gray-700 to-gray-500 text-white">
        <Navbar />
        <main className="">
          <div>
            <h1 className="text-xl lg:text-3xl font-bold p-4 text-center mt-20">
              Météo des 6 prochaines heures à <span>{city}</span>
            </h1>
            <div className="items-center mb-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 mx-auto text-white">
                {sixHourWeather.map((weatherItem, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center mb-4  relative glass-effect p-3 rounded-lg shadow-lg "
                  >
                    <p>{weatherItem.heure} h</p>
                    {weatherItem.temperature && (
                      <p>{weatherItem.temperature} °C</p>
                    )}
                    <p>{weatherItem.description}</p>
                    {weatherItem.icon && (
                      <Image
                        src={`http://openweathermap.org/img/w/${weatherItem.icon}.png`}
                        alt="weather icon"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <h1 className="text-xl lg:text-3xl font-bold p-4 text-center">
              Météo des 8 prochains jours à <span>{city}</span>
            </h1>
            <div className="items-center mb-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 mx-auto text-black">
                {weather.map((weatherItem, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center mb-4 border-2 glass-effect text-white p-3 rounded-lg shadow-lg "
                  >
                    {/**remplacer le premier wheatherItem.jour par "aujourd'hui et le deuxième par "demain"*/}

                    {index === 0 ? (
                      <p>Aujourd&apos;hui</p>
                    ) : index === 1 ? (
                      <p>Demain</p>
                    ) : (
                      <p>{weatherItem.jour}</p>
                    )}

                    {weatherItem.tempMin && weatherItem.tempMax && (
                      <p>
                        {weatherItem.tempMin} °C / {weatherItem.tempMax} °C
                      </p>
                    )}
                    <p>{weatherItem.description}</p>
                    {weatherItem.icon && (
                      <Image
                        src={`http://openweathermap.org/img/w/${weatherItem.icon}.png`}
                        alt="weather icon"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/** champ de recherche pour afficher la météo d'autres ville*/}
          <div className="flex flex-col items-center w-11/12 mx-auto ">
            <h1 className="text-white mb-4 text-center">
              Taper le nom d&apos;une ville pour voir sa météo actuelle
            </h1>
            <div className="flex flex-col items-center justify-center w-1/2">
              <input
                type="text"
                className="lg:w-1/2 p-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black"
                placeholder="Ville"
                value={searchedCity}
                onChange={(e) => {
                  setSearchedCity(e.target.value);
                }}
              />
              <button
                className="lg:w-1/4 p-2 mb-4 bg-amber-900 text-white rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50"
                onClick={fetchSearchedWeather}
              >
                Rechercher
              </button>
            </div>

            <div className="flex flex-col items-center mb-4 w-full">
              {lastSearchedCity ? (
                <>
                  <h1>
                    {lastSearchedCity} {searchedWeather.heure}h
                  </h1>
                  {searchedWeather.temperature && (
                    <p>{searchedWeather.temperature} °C</p>
                  )}
                  <p>
                    {translateWeatherDescription(
                      searchedWeather.description ?? ""
                    )}
                  </p>
                  <Image
                    src={`http://openweathermap.org/img/w/${searchedWeather.icon}.png`}
                    alt="weather icon"
                    width={100}
                    height={100}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Meteo;
