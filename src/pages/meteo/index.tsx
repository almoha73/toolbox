import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CloudSun, Search, MapPin, Thermometer, Clock3 } from "lucide-react";
import { translateWeatherDescription } from "../../utils/weatherUtils";

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

export default function Meteo() {
  const [city, setCity] = useState("Localisation...");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [lastSearchedCity, setLastSearchedCity] = useState("");

  const [searchedWeather, setSearchedWeather] = useState<{
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

  const [sixHourWeather, setSixHourWeather] = useState<WeatherItem[]>(initialSixHourWeather);
  const [weather, setWeather] = useState<Weather[]>(initialWeather);
  const [loading, setLoading] = useState(true);

  const apiKey = "1e13ef02fc68057b2d90d17a5fbe1a22";

  const fetchSearchedWeather = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchedCity.trim()) return;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=\${searchedCity}&appid=\${apiKey}&units=metric`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.cod === 200) {
        setSearchedWeather({
          temperature: parseFloat(data.main.temp).toFixed(1) as any as number,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          heure: new Date(data.dt * 1000).getHours(),
        });
        setLastSearchedCity(searchedCity.charAt(0).toUpperCase() + searchedCity.slice(1));
        setSearchedCity("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          try {
            const response = await fetch(
              `http://api.openweathermap.org/geo/1.0/reverse?lat=\${position.coords.latitude}&lon=\${position.coords.longitude}&appid=\${apiKey}`
            );
            const data = await response.json();
            if (data && data[0]) setCity(data[0].name);
          } catch (e) {
            console.error(e);
          }
        },
        () => {
          setCity("Géolocalisation désactivée");
          setLoading(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (lat && lon) {
      const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=\${lat}&lon=\${lon}&appid=\${apiKey}&units=metric&lang=fr`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.hourly) {
            const sixHourForecast = data.hourly.slice(0, 6).map((hour: any) => ({
              heure: new Date(hour.dt * 1000).getHours(),
              temperature: parseFloat(hour.temp).toFixed(1),
              description: hour.weather[0].description,
              icon: hour.weather[0].icon,
            }));
            setSixHourWeather(sixHourForecast);
          }

          if (data.daily) {
            const dailyForecast = data.daily.slice(0, 8).map((day: any) => ({
              jour: new Date(day.dt * 1000).toLocaleDateString("fr-FR", { weekday: "long" }),
              tempMin: parseFloat(day.temp.min).toFixed(1),
              tempMax: parseFloat(day.temp.max).toFixed(1),
              description: day.weather[0].description,
              icon: day.weather[0].icon,
            }));
            setWeather(dailyForecast);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [lat, lon]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans md:pt-20 pt-16 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 z-10 space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-amber-500 mb-2">
              <CloudSun className="w-8 h-8" />
              <h1 className="text-3xl font-bold text-white tracking-tight">Météo</h1>
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <MapPin className="w-4 h-4" />
              <p className="text-lg">{city}</p>
            </div>
          </div>

          <form onSubmit={fetchSearchedWeather} className="relative w-full md:w-96">
            <input
              type="text"
              className="w-full bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-2xl pl-12 pr-4 py-3 outline-none transition-all placeholder:text-neutral-500"
              placeholder="Rechercher une ville..."
              value={searchedCity}
              onChange={(e) => setSearchedCity(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          </form>
        </header>

        <AnimatePresence>
          {lastSearchedCity && searchedWeather.temperature && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-br from-amber-500/20 to-orange-500/5 border border-amber-500/20 rounded-3xl p-8 backdrop-blur-xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{lastSearchedCity}</h2>
                  <p className="text-amber-200/80 capitalize flex items-center gap-2">
                    <Clock3 className="w-4 h-4" /> {searchedWeather.heure}h00 • {translateWeatherDescription(searchedWeather.description ?? "")}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  {searchedWeather.icon && (
                    <Image
                      src={`http://openweathermap.org/img/w/\${searchedWeather.icon}.png`}
                      alt="weather icon"
                      width={80}
                      height={80}
                      className="drop-shadow-lg"
                    />
                  )}
                  <div className="text-5xl font-bold tabular-nums tracking-tighter">
                    {searchedWeather.temperature}°
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Clock3 className="w-5 h-5 text-neutral-400" />
                Prochaines heures
              </h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                {sixHourWeather.map((item, i) => (
                  item.heure !== null && (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-neutral-800/60 transition-colors"
                    >
                      <span className="text-neutral-400 font-medium mb-3">{item.heure}h</span>
                      {item.icon && (
                        <Image
                          src={`http://openweathermap.org/img/w/\${item.icon}.png`}
                          alt="weather icon"
                          width={60}
                          height={60}
                          className="mb-2"
                        />
                      )}
                      <span className="text-2xl font-bold mb-1">{item.temperature}°</span>
                      <span className="text-xs text-neutral-500 capitalize line-clamp-1">
                        {translateWeatherDescription(item.description || "")}
                      </span>
                    </motion.div>
                  )
                ))}
              </motion.div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-neutral-400" />
                Prévisions sur 8 jours
              </h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {weather.map((item, i) => (
                  item.jour !== null && (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:bg-neutral-800/60 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-semibold capitalize text-lg">
                          {i === 0 ? "Aujourd'hui" : i === 1 ? "Demain" : item.jour}
                        </span>
                        {item.icon && (
                          <Image
                            src={`http://openweathermap.org/img/w/\${item.icon}.png`}
                            alt="weather icon"
                            width={50}
                            height={50}
                            className="drop-shadow"
                          />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">{item.tempMax}°</span>
                          <span className="text-lg font-medium text-neutral-500">/ {item.tempMin}°</span>
                        </div>
                        <p className="text-sm text-neutral-400 capitalize">
                          {translateWeatherDescription(item.description || "")}
                        </p>
                      </div>
                    </motion.div>
                  )
                ))}
              </motion.div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
