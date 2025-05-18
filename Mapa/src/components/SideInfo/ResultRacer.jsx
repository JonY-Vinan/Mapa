import React, { useEffect, useState } from "react";
import "./ResultRacer.css";

const ResultRacer = ({ idCircuito }) => {
  const [drivers, setDrivers] = useState([]);
  const [id, setId] = useState(1); // Valor inicial 1

  // Actualiza `id` solo cuando `idCircuito` cambie
  useEffect(() => {
    if (idCircuito) {
      setId(idCircuito);
    } else {
      console.log("No hay idCircuito, usando valor por defecto (1)");
    }
  }, [idCircuito]);

  const API_URL = `https://ergast.com/api/f1/2024/${id}/results.json`;

  useEffect(() => {
    const cargarPosiciones = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Asegúrate de mapear correctamente los datos de la API
        const driversData = data.MRData.RaceTable.Races[0]?.Results.map(
          (result) => ({
            id: result.Driver.driverId,
            full_name: `${result.Driver.givenName} ${result.Driver.familyName}`,
            team_name: result.Constructor.name,
            position: result.position,
            points: result.points,
          })
        );
        setDrivers(driversData || []);
      } catch (error) {
        console.error("Error al cargar posiciones:", error);
      }
    };

    cargarPosiciones();
  }, [API_URL]); // Dependencia: `API_URL` (que depende de `id`)

  return (
    <section className="drivers">
     
      <div className="drivers-grid">
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <div
              className="driver-card"
              key={driver.id}
              values={driver.position}
              
            >
              <h5>
                <p>{driver.team_name}</p>   {driver.full_name}
              </h5>
              
            </div>
          ))
        ) : (
          <p>Cargando posiciones de los pilotos...</p>
        )}
      </div>
    </section>
  );
};

export default ResultRacer;
