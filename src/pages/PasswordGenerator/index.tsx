import Checkbox from "@/components/Checkbox";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import React from "react";


const PasswordGenerator = () => {
  const [password, setPassword] = React.useState<string>("");
  const [length, setLength] = React.useState<number>(8);
  const [uppercase, setUppercase] = React.useState<boolean>(true);
  const [lowercase, setLowercase] = React.useState<boolean>(true);
  const [numbers, setNumbers] = React.useState<boolean>(true);
  const [specials, setSpecials] = React.useState<boolean>(true);

  const generatePassword = () => {
    let characters = "";
    let generatedPassword = "";

    if (uppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (lowercase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }
    if (numbers) {
      characters += "0123456789";
    }
    if (specials) {
      characters += "!@#$%^&*()_+";
    }

    for (let i = 0; i < length; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setPassword(generatedPassword);
  };

  const [showModal, setShowModal] = React.useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);

    openModal();
    setTimeout(() => {
      closeModal();
    }, 2000);

   
  };

  return (
    // faire le générateur de mot de passe avec les fonctions ci-dessus
    <>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        title="Mot de passe copié !"
      />
      <div className="flex flex-col w-full min-h-screen ">
        <Navbar />
        <main className="bg-black flex-1 flex items-center z-10">
          <div className="bg-gray-800 bg-gradient-to-br from-gray-500 via-gray-700 to-gray-500 border-2 h-auto mt-20 p-6 flex flex-col justify-center items-center w-11/12 md:w-10/12 mx-auto lg:rounded-full text-red-400">
            <h1 className="text-center text-2xl lg:text-4xl md:text-2xl font-bold mb-4 ">
              Générateur de mot de passe
            </h1>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="length" className="">
                  Longueur du mot de passe
                </label>
                <input
                  type="number"
                  id="length"
                  className="border-2 border-gray-500 rounded-md p-2 text-gray-950 w-16"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                />
              </div>
             

              <Checkbox label="Majuscules" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
              <Checkbox label="Minuscules" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} />
              <Checkbox label="Chiffres" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />
              <Checkbox label="Caractères spéciaux" checked={specials} onChange={(e) => setSpecials(e.target.checked)} />
              
              <div className="flex items-center gap-4">
                <button
                  className="border-2 border-gray-500 rounded-md p-2"
                  onClick={generatePassword}
                >
                  Générer
                </button>
                <button
                  className="border-2 border-gray-500 rounded-md p-2"
                  onClick={copyPassword}
                >
                  Copier
                </button>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  className="border-2 border-gray-500 rounded-md p-2 text-gray-950"
                  value={password}
                  readOnly
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PasswordGenerator;
