import React, { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudSun, Search, MapPin, Thermometer, Clock3,
  Sun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning
} from "lucide-react";

interface WeatherItem {
  temperature: number | null;
  heure: number | null;
  description: string;
  code: number | null;
}

interface Weather {
  tempMin: number | null;
  tempMax: number | null;
  jour: string | null;
  description: string;
  code: number | null;
}

const getWeatherIcon = (code: number | null, props: any) => {
  if (code === null) return <Cloud {...props} />;
  if (code === 0) return <Sun {...props} />;
  if (code >= 1 && code <= 3) return <CloudSun {...props} />;
  if (code === 45 || code === 48) return <CloudFog {...props} />;
  if ([51, 53, 55, 56, 57].includes(code)) return <CloudDrizzle {...props} />;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <CloudRain {...props} />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <CloudSnow {...props} />;
  if ([95, 96, 99].includes(code)) return <CloudLightning {...props} />;
  return <Cloud {...props} />;
};

const getWeatherDescription = (code: number | null) => {
  if (code === null) return "";
  switch (code) {
    case 0: return "Ciel dégagé";
    case 1: return "Principalement clair";
    case 2: return "Partiellement nuageux";
    case 3: return "Couvert";
    case 45: case 48: return "Brouillard";
    case 51: case 53: case 55: return "Bruine";
    case 56: case 57: return "Bruine verglaçante";
    case 61: case 63: case 65: return "Pluie";
    case 66: case 67: return "Pluie verglaçante";
    case 71: case 73: case 75: return "Chute de neige";
    case 77: return "Grains de neige";
    case 80: case 81: case 82: return "Averses de pluie";
    case 85: case 86: return "Averses de neige";
    case 95: return "Orage";
    case 96: case 99: return "Orage grêle";
    default: return "Inconnu";
  }
};

const initialSixHourWeather: WeatherItem[] = Array(6).fill({
  heure: null,
  temperature: null,
  description: "",
  code: null,
});

const initialWeather: Weather[] = Array(7).fill({
  tempMin: null,
  tempMax: null,
  jour: null,
  description: "",
  code: null,
});

export default function Meteo() {
  const [city, setCity] = useState("Localisation...");
  const [searchedCity, setSearchedCity] = useState("");
  const [lastSearchedCity, setLastSearchedCity] = useState("");

  const [searchedWeather, setSearchedWeather] = useState<{
    temperature: number | null;
    description: string;
    code: number | null;
    heure: number | null;
  }>({
    temperature: null,
    description: "",
    code: null,
    heure: null,
  });

  const [sixHourWeather, setSixHourWeather] = useState<WeatherItem[]>(initialSixHourWeather);
  const [weather, setWeather] = useState<Weather[]>(initialWeather);
  const [loading, setLoading] = useState(true);

  const fetchWeatherFromCoords = async (lat: number, lon: number, cityName: string) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.current_weather) {
        // Six hour forecast
        const currentIsoDate = data.current_weather.time.slice(0, 13); // e.g. "2026-02-26T20"
        let currentIndex = data.hourly.time.findIndex((t: string) => t.startsWith(currentIsoDate));
        if (currentIndex === -1) currentIndex = 0;

        const sixHourForecast = [];
        for (let i = 1; i <= 6; i++) {
          const idx = currentIndex + i;
          if (idx < data.hourly.time.length) {
            sixHourForecast.push({
              heure: new Date(data.hourly.time[idx]).getHours(),
              temperature: Math.round(data.hourly.temperature_2m[idx] * 10) / 10,
              description: getWeatherDescription(data.hourly.weathercode[idx]),
              code: data.hourly.weathercode[idx]
            });
          }
        }
        setSixHourWeather(sixHourForecast);

        // Daily forecast
        const dailyForecast = [];
        for (let i = 0; i < data.daily.time.length && i < 7; i++) {
          const dayDate = new Date(data.daily.time[i]);
          dailyForecast.push({
            jour: dayDate.toLocaleDateString("fr-FR", { weekday: "long" }),
            tempMax: Math.round(data.daily.temperature_2m_max[i] * 10) / 10,
            tempMin: Math.round(data.daily.temperature_2m_min[i] * 10) / 10,
            description: getWeatherDescription(data.daily.weathercode[i]),
            code: data.daily.weathercode[i]
          });
        }
        setWeather(dailyForecast);
        setCity(cityName);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchedWeather = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchedCity.trim()) return;

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchedCity)}&count=1&language=fr`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (geoData.results && geoData.results.length > 0) {
        const { latitude, longitude, name } = geoData.results[0];

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        if (weatherData.current_weather) {
          setSearchedWeather({
            temperature: Math.round(weatherData.current_weather.temperature * 10) / 10,
            description: getWeatherDescription(weatherData.current_weather.weathercode),
            code: weatherData.current_weather.weathercode,
            heure: new Date(weatherData.current_weather.time).getHours(),
          });
          setLastSearchedCity(name);
          setSearchedCity("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            // Reverse geocode to get city name
            const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=fr`;
            const geoRes = await fetch(geoUrl, { headers: { "User-Agent": "Toolbox-App/1.0" } });
            const geoData = await geoRes.json();
            const cityName = geoData.address?.city || geoData.address?.town || geoData.address?.village || "Ma position";
            fetchWeatherFromCoords(lat, lon, cityName);
          } catch (e) {
            fetchWeatherFromCoords(lat, lon, "Ma position");
          }
        },
        () => {
          // Fallback to Paris if geolocation is denied
          fetchWeatherFromCoords(48.8534, 2.3488, "Paris");
        },
        { timeout: 5000 }
      );
    } else {
      fetchWeatherFromCoords(48.8534, 2.3488, "Paris");
    }
  }, []);

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
          {lastSearchedCity && searchedWeather.temperature !== null && (
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
                    <Clock3 className="w-4 h-4" /> {searchedWeather.heure}h00 • {searchedWeather.description}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-amber-500 drop-shadow-lg">
                    {getWeatherIcon(searchedWeather.code, { className: "w-20 h-20" })}
                  </div>
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
                      <div className="mb-2 text-amber-500">
                        {getWeatherIcon(item.code, { className: "w-10 h-10 mx-auto" })}
                      </div>
                      <span className="text-2xl font-bold mb-1">{item.temperature}°</span>
                      <span className="text-xs text-neutral-500 capitalize line-clamp-1">
                        {item.description}
                      </span>
                    </motion.div>
                  )
                ))}
              </motion.div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-neutral-400" />
                Prévisions sur 7 jours
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
                        <div className="text-amber-500 drop-shadow">
                          {getWeatherIcon(item.code, { className: "w-8 h-8" })}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">{item.tempMax}°</span>
                          <span className="text-lg font-medium text-neutral-500">/ {item.tempMin}°</span>
                        </div>
                        <p className="text-sm text-neutral-400 capitalize">
                          {item.description}
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
