import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Calculator() {
  const [display, setDisplay] = useState("");

  const handleClick = (val: string) => {
    setDisplay((prevDisplay) => prevDisplay + val);
  };

  const handleClear = () => {
    setDisplay("");
  };

  // TODO: Implement handleEquals, handleDelete, handleNegative, handlePercent avec typescript

  function handleEquals() {
    const equal = eval(display).toFixed(3);

    // si les chiffres après la virgule sont égaux à 0, on les supprime
    if (equal.slice(-3) === "000") {
      setDisplay(String(Number(equal.slice(0, -3))));
      return;
    }
    setDisplay(String(equal));
  }
  console.log(display);
  function handleDelete() {
    if (typeof display !== "string" || display === "") return;
    setDisplay(display.slice(0, -1));
  }

  function handleNegative() {
    setDisplay(String(Number(display) * -1));
  }

  function handlePercent() {
    setDisplay(String(Number(display) / 100));
  }

  return (
    <div className="calculator w-full min-h-screen  text-red-400">
      <Navbar />
      <main className="w-full flex-1 flex flex-col justify-center items-center mt-12 gap-4 bg-black  h-screen">
        <h1 className="text-2xl lg:text-4xl">Calculatrice</h1>
        <div className="flex flex-col items-center  border-2 px-4 py-6 lg:p-8 rounded-3xl justify-center bg-gray-800 bg-gradient-to-br from-gray-500 via-gray-700 to-gray-500">
          <div className="h-12 w-full bg-white text-black justify-center text-2xl mb-8 flex items-center">
            {display}
          </div>
          <div className="buttons w-64 lg:w-96 mx-auto">
            <div className="grid grid-cols-4 gap-4">
              <button className="border p-2" onClick={() => handleClick("1")}>
                1
              </button>

              <button className="border p-2" onClick={() => handleClick("2")}>
                2
              </button>
              <button className="border p-2" onClick={() => handleClick("3")}>
                3
              </button>
              <button className="border p-2" onClick={() => handleClick("+")}>
                +
              </button>
              <button className="border p-2" onClick={() => handleClick("4")}>
                4
              </button>
              <button className="border p-2" onClick={() => handleClick("5")}>
                5
              </button>

              <button className="border p-2" onClick={() => handleClick("6")}>
                6
              </button>
              <button className="border p-2" onClick={() => handleClick("-")}>
                -
              </button>
              <button className="border p-2" onClick={() => handleClick("7")}>
                7
              </button>
              <button className="border p-2" onClick={() => handleClick("8")}>
                8
              </button>
              <button className="border p-2" onClick={() => handleClick("9")}>
                9
              </button>
              <button className="border p-2" onClick={() => handleClick("*")}>
                *
              </button>
              <button className="border p-2" onClick={() => handleClick("0")}>
                0
              </button>
              <button className="border p-2" onClick={handleClear}>
                Clear
              </button>
              <button className="border p-2" onClick={() => handleClick(".")}>
                .
              </button>
              <button className="border p-2" onClick={() => handleClick("/")}>
                /
              </button>
              <button className="border p-2" onClick={() => handleEquals()}>
                =
              </button>
              <button className="border p-2" onClick={() => handleDelete()}>
                DEL
              </button>
              <button className="border p-2" onClick={() => handleClick("+")}>
                +
              </button>
              <button className="border p-2" onClick={() => handlePercent()}>
                %
              </button>
              <button className="border p-2" onClick={() => handleNegative()}>
                +/-
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
