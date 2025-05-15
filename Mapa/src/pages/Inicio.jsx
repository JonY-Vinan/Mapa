import React, { useState } from "react";
import "./Inicio.css";
import Home from "./Home.jsx";
import Portada from "./Portada.jsx";

const Inicio = () => {
  const [mostrarHome, setMostrarHome] = useState(false);
  const [transitionComplete, setTransitionComplete] = useState(false);

  const handleMostrarHome = () => {
    setMostrarHome(true);
    setTimeout(() => {
      setTransitionComplete(true);
    }, 1000); // Ajusta este tiempo según la duración de tu animación
  };

  return (
    <div className="inicio-container">
      <div
        className={`portada-container ${mostrarHome ? "slide-out-left" : ""}`}
      >
        <Portada
          handleMostrarHome={handleMostrarHome}
          transitionComplete={transitionComplete}
        />
      </div>
      <div className="home-container">{mostrarHome && <Home />}</div>
    </div>
  );
};

export default Inicio;
