import React, { useState, useEffect } from "react";

const Chronometre = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const start = (): void => {
    setIsRunning(true);
  };

  const stop = (): void => {
    setIsRunning(false);
  };

  const reset = (): void => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const h = Math.floor(time / 3600).toString().padStart(2, "0");
    const m = Math.floor((time % 3600) / 60).toString().padStart(2, "0");
    const s = (time % 60).toString().padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if(interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, time]);


  return (
    <div className="bg-gray-800 bg-gradient-to-br from-gray-500 via-gray-700 to-gray-500 h-auto py-6 px-8 rounded-xl flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl font-bold mb-4 text-white">
        Chronomètre
      </h1>

      <div className="text-center">
        <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-4xl mb-4">
          {formatTime(time)}
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
