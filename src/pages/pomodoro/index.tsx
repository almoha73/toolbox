import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect } from "react";

const Timer = () => {
	const [time, setTime] = React.useState(900);
	const [timeStart, setTimeStart] = React.useState(false);

	const buttons = [
		{
			value: 60,
			display: "15 min",
		},
		{
			value: 1500,
			display: "25 min",
		},
		{
			value: 1800,
			display: "30 min",
		},
	];

	const toggleTimer = () => {
		setTimeStart(!timeStart);
	};

	useEffect(() => {
		const bell = new Audio("/assets/bell.mp3");
		const interval = setInterval(() => {
			if (timeStart) {
				if (time > 0) {
					setTime(time - 1);
				} else if (time === 0) {
					bell.play();
					clearInterval(interval);
				}
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [timeStart, time]);

	const resetTimer = () => {
		setTime(900);
		setTimeStart(false);
	};

	const formatTime = (time: number) => {
		let minutes: string | number = Math.floor(time / 60);
		let seconds: string | number = time - minutes * 60;
		seconds = seconds < 10 ? `0${seconds}` : seconds;
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		return `${minutes}:${seconds}`;
	};

	return (
		<>
			<Navbar />
			<div className="w-full min-h-screen bg-black text-red-400 flex flex-col items-center justify-center">
				<h1 className="text-5xl mb-8">POMODORO</h1>
				<div className="bg-gray-800 bg-gradient-to-br from-gray-500 via-gray-700 to-gray-500 flex flex-col items-center lg:w-96 border-2 lg:h-96 justify-center lg:rounded-full p-2 md:p-6">
					<div className="w-68 mb-8 flex justify-center items-center gap-4">
						{buttons.map((button, index) => (
							<button
								key={index}
								onClick={() => setTime(button.value)}
								className="border p-4"
							>
								{button.display}
							</button>
						))}
					</div>
					<div className="w-40 text-center mb-8 text-5xl">
						{formatTime(time)}
					</div>
					<div className="flex">
						<button onClick={toggleTimer} className="block w-28 mr-6 border">
							{timeStart ? "Stop" : "Start"}
						</button>
						<button onClick={resetTimer} className="block w-28  border">
							Reset
						</button>
					</div>
				</div>
				<Link href="/pomodoro/repos" className="text-4xl mt-8 border px-4 py-2">
					Temps de repos
				</Link>
			</div>
		</>
	);
};

export default Timer;
