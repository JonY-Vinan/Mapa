import React, { useState, useEffect } from "react";
import "./PosicionPilotos.css";

const PosicionPilotos = () => {
  const [pilotos, setPilotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPilotos = async () => {
      try {
        const respuesta = await fetch("/json/PitStop.json");

        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información de pilotos");
        }

        const datos = await respuesta.json();
        setPilotos(datos.pitStops || []);
      } catch (error) {
        console.error("Error al cargar los pilotos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    cargarPilotos();
  }, []);

  if (loading) return <div>Cargando información de pilotos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="parrilla-container">
      <h2>Parrilla de Salida</h2>
      <div className="grid-parrilla">
        {pilotos.map((piloto, index) => (
          <div
            key={piloto.driverTla || index}
            className={`grid-item ${index % 2 === 0 ? "izquierda" : "derecha"}`}
          >
            <div className="posicion">{index + 1}</div>
            <div className="nombre">{piloto.driverName}</div>
            {/* <div className="equipo">{piloto.driverTla}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PosicionPilotos;
