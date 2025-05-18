import React, { useEffect, useState } from "react";
import "./ResultRacer.css";

const ResultRacer = ({ idCircuito, piloto_name, onDriverClick }) => {
  const [drivers, setDrivers] = useState([]);
  const [id, setId] = useState(1);
  
  useEffect(() => {
    if (idCircuito) {
      setId(idCircuito);
    }
  }, [idCircuito]);

  const API_URL = `https://ergast.com/api/f1/2024/${id}/results.json`;

  useEffect(() => {
    const cargarPosiciones = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
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
  }, [API_URL]);

  return (
    <section className="drivers">
      <div className="drivers-grid">
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <div
              className="driver-card"
              key={driver.id}
              onClick={() => onDriverClick(driver.full_name)}
              style={{ cursor: 'pointer' }}
            >
              <h5>
                <p>{driver.team_name}</p> {driver.full_name}
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