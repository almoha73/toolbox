import React from "react";
import Minuteur from "../../components/Chronometre";
import Chronometre from "../../components/Minuteur";


const Timer = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full space-y-8 bg-gray-800 bg-gradient-to-br from-gray-500 via-gray-700 to-gray-500">
      <Minuteur />
      <Chronometre />
      
    </div>
  );
};

export default Timer;
