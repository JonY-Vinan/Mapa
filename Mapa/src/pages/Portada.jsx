import React, { useEffect, useRef } from "react";
import "./Portada.css";

const Portada = ({ handleMostrarHome }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => {
      if (titleRef.current) titleRef.current.style.opacity = 1;
    }, 200);

    setTimeout(() => {
      if (subtitleRef.current) subtitleRef.current.style.opacity = 1;
    }, 600);

    setTimeout(() => {
      if (buttonRef.current) buttonRef.current.style.opacity = 1;
    }, 1000);
  }, []);

  return (
    <div className="portada-content">
      <img src="f1_back.jpg" alt="Fondo" className="background-image" />
      <div className="racing-overlay"></div>
      <div className="welcome-message">
        <h1 ref={titleRef} className="racing-text">
          ¡PREPÁRATE PARA LA CARRERA!
        </h1>
        <p ref={subtitleRef} className="racing-subtext">
          Acelera hacia la experiencia definitiva de F1
        </p>
        <button
          ref={buttonRef}
          className="enter-button racing-btn"
          onClick={handleMostrarHome}
        >
          INICIAR CARRERA
        </button>
      </div>
    </div>
  );
};

export default Portada;
