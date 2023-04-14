import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { translateWeatherDescription } from "../../utils/weatherUtils";

// page meteo en utilisant typescript

const Meteo = () => {
	const [city, setCity] = useState(""); // ville de l'utilisateur
	const [temperature, setTemperature] = useState<number | null>(null); // température de la ville de l'utilisateur
	let [description, setDescription] = useState<string | undefined>(""); // description de la météo de la ville de l'utilisateur
	const [icon, setIcon] = useState(null); // icone de la météo de la ville de l'utilisateur
	const [searchedCity, setSearchedCity] = useState(""); // ville tapée dans le champ de recherche
	const [lastSearchedCity, setLastSearchedCity] = useState(""); // dernière ville tapée dans le champ de recherche
	const [searchedWeather, setSearchedWeather] = useState<{
		// météo de la ville tapée dans le champ de recherche
		temperature: number | null;
		description: string | undefined;
		icon: string | null;
	}>({
		temperature: null,
		description: undefined,
		icon: null,
	});

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
				const { latitude, longitude } = position.coords;
				const response = await fetch(
					`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
				);
				const data = await response.json();
				setCity(data.address.city || data.address.town);
			});
		} else {
			console.log(
				"La géolocalisation n'est pas prise en charge par votre navigateur."
			);
		}
	}, []);

	// Récupération des données météo locales de l'utilisateur
	useEffect(() => {
		const apiKey = "1e13ef02fc68057b2d90d17a5fbe1a22";
		const country = "FR";
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				setTemperature(data.main.temp.toFixed(1));
				setDescription(
					translateWeatherDescription(data.weather[0].description)
				);
				setIcon(data.weather[0].icon);
			})
			.catch((error) => console.error(error));
	}, [city]);

	console.log(description);

	return (
		<>
			<Navbar />
			<h1 className="text-3xl font-bold p-4 text-center mt-8">Météo</h1>
			<div className="flex flex-col items-center mb-4">
				<h1>{city}</h1>
				{temperature && <p>{temperature} °C</p>}
				<p>{description}</p>
				{icon && (
					<Image
						src={`http://openweathermap.org/img/w/${icon}.png`}
						alt="weather icon"
						width={100}
						height={100}
					/>
				)}
			</div>

			<div className="flex flex-col items-center mb-4 w-full">
				{lastSearchedCity ? (
					<>
						<h1>{lastSearchedCity}</h1>
						{searchedWeather.temperature && (
							<p>{searchedWeather.temperature} °C</p>
						)}
						<p>
							{translateWeatherDescription(searchedWeather.description ?? "")}
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

			{/** champ de recherche pour afficher la météo d'autres ville*/}
			<div className="flex flex-col items-center w-full ">
				<div className="flex flex-col items-center justify-center w-1/2">
					<input
						type="text"
						className="lg:w-1/2 p-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
						placeholder="Ville"
						value={searchedCity}
						onChange={(e) => {
							setSearchedCity(e.target.value);
						}}
					/>
					<button
						className="lg:w-1/4 p-2 mb-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
						onClick={fetchSearchedWeather}
					>
						Rechercher
					</button>
				</div>
			</div>
		</>
	);
};

export default Meteo;
