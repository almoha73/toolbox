import React, { useState, useEffect } from "react";

// page Minuteur

const MinuteurChronometre = () => {
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
      }, 1000)
    );
    setIsRunning(true);
  };

  // fonction stop
  const stop = () => {
    clearInterval(intervalId);
  };

  // fonction reset
  const reset = () => {
    setSeconds(0);
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
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Minuteur</h1>

          <div className="text-center">
            <span className="badge badge-primary">{formattedTime}</span>

            <button onClick={start} className="btn btn-primary ml-2">
              Start
            </button>
            <button onClick={stop} className="btn btn-danger ml-2">
              Stop
            </button>
            <button onClick={reset} className="btn btn-warning ml-2">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinuteurChronometre;
