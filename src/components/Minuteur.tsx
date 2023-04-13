import React, { useState, useEffect } from "react";

const Minuteur = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const [time, setTime] = useState<number>(
    hours * 3600 + minutes * 60 + seconds
  );

  useEffect(() => {
    setTime(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setTime(hours * 3600 + minutes * 60 + seconds);
    setIsActive(false);
  };

  const formatTime = (time: number): string => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="bg-gray-800 bg-gradient-to-br from-gray-500 via-gray-700 to-gray-500 h-auto p-6 rounded-xl flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Minuteur</h1>
        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value) || 0)}
            className="border-2 border-gray-300 rounded w-20 text-center"
            placeholder="Heures"
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
            className="border-2 border-gray-300 rounded w-20 text-center"
            placeholder="Minutes"
          />
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
            className="border-2 border-gray-300 rounded w-20 text-center"
            placeholder="Secondes"
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold mb-4 text-white">
            {formatTime(time)}
          </div>
          <div className="space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={toggle}
            >
              {isActive ? "Pause" : "Démarrer"}
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={reset}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Minuteur;
