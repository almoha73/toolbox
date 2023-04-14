import React, { useState, useEffect, useRef } from "react";

// page Chronomètre

const Chronometre = () => {
  // state pour le chronomètre
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  // fonction start
  const start = () => {
    if (isRunning) return;
    setIntervalId(
      setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        if (seconds === 59) {
          setSeconds(0);
          setMinutes((minutes) => minutes + 1);
        }
        if (minutes === 59) {
          setMinutes(0);
          setHours((hours) => hours + 1);
        }
      }, 1000)
    );
    setIsRunning(true);
  };

  // fonction stop
  const stop = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  // fonction reset
  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };
  // Formatage des secondes pour que l'affichage soit toujours de 2 chiffres
  const s = String(seconds).padStart(2, "0");

  // Formatage des minutes pour que l'affichage soit toujours de 2 chiffres
  const m = String(minutes).padStart(2, "0");

  // Formatage de l'heure pour que l'affichage soit toujours de 2 chiffres
  const h = String(hours).padStart(2, "0");

  // Formatage de l'heure
  const formattedTime = `${h} : ${m} : ${s}`;

  return (
    <div className="bg-gray-800 bg-gradient-to-br from-gray-500 via-gray-700 to-gray-500 h-auto py-6 px-8 rounded-xl flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl font-bold mb-4 text-white">
        Chronomètre
      </h1>

      <div className="text-center">
        <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-4xl mb-4">
          {formattedTime}
        </span>
        <div className="flex items-center justify-center">
          <button
            onClick={start}
            className="ml-2 px-4 py-2 border-2 border-blue-500 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start
          </button>
          <button
            onClick={stop}
            className="ml-2 px-4 py-2 border-2 border-blue-500 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="ml-2 px-4 py-2 border-2 border-blue-500 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chronometre;
