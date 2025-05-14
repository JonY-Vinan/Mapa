import React from "react";
import "./Inicio.css";
// import portada from "/public/f1.jpg"; // Si prefieres usar <img>
import Home from "./Home.jsx";
const Inicio = () => {
  return (
    <>
      {/* <div className="contenedor" id="titulo">
        <h1>¡Bienvenido a la F1!</h1>
        <p>Explora las carreras y las noticias de la F1.</p>
      </div> */}
      <div>
        <Home />
      </div>
    </>
  );
};

export default Inicio;
