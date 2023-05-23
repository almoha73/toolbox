import React from "react";

// faire une modale pour le mot de passe copié (voir src\pages\PasswordGenerator\index.tsx)
// const modal = document.createElement("div");
// modal.classList.add("fixed", "top-0", "left-0", "right-0", "bottom-0", "bg-gray-800", "bg-opacity-50", "flex", "justify-center", "items-center", "z-50");
// modal.innerHTML = `
// <div class="bg-white rounded-xl p-8">
//   <p class="text-center text-2xl font-bold">Mot de passe copié !</p>
// </div>
// `;
// document.body.appendChild(modal);

interface ModalProps {
    showModal: boolean;
    closeModal: () => void;
    title: string;
  }
  
  const Modal: React.FC<ModalProps> = ({ showModal, closeModal, title }) => {
    if (!showModal) {
      return null;
    }
  
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl p-8">
          <p className="text-center text-2xl font-bold">{title}</p>
        </div>
      </div>
    );
  };
  
  export default Modal;

  
  
  
  
  
  
