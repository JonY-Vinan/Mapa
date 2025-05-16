import React, { useEffect, useState } from "react";

const PitStop = () => {
  const [drivers, setDrivers] = useState([]);
  const API_URL = "https://api.openf1.org/v1/drivers"; // Reemplázalo con la API real

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setDrivers(data))
      .catch((error) => console.error("Error al obtener los pilotos:", error));
  }, []);

  return (
    <section className="drivers">
      <h2>Posiciones de los Pilotos</h2>
      <div className="drivers-grid">
        {drivers.length > 0 ? (
          drivers.map((driver, index) => (
            <div className="driver-card" key={index}>
              <h3>
                {index + 1}° {driver.full_name}
              </h3>
              <p>Equipo: {driver.team_name}</p>
              <p>Puntos: {driver.points}</p>
            </div>
          ))
        ) : (
          <p>Cargando posiciones de los pilotos...</p>
        )}
      </div>
    </section>
  );
};

export default PitStop;
