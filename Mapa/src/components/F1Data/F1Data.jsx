import React from "react";
import "./F1Data.css";

const F1Data = () => {
  const drivers = [
    { name: "Max Verstappen", points: 250 },
    { name: "Lewis Hamilton", points: 230 },
    { name: "Charles Leclerc", points: 190 },
  ];

  const constructors = [
    { name: "Red Bull", points: 500 },
    { name: "Mercedes", points: 450 },
    { name: "Ferrari", points: 400 },
  ];

  return (
    <section className="f1-data-section">
      <div className="data-card car-data">
        <h2>Datos del Coche</h2>
        <div className="car-specs">
          <p>
            <strong>Aerodinámica:</strong> Alta carga aerodinámica
          </p>
          <p>
            <strong>Motor:</strong> Honda RA621H 1.6L V6 Turbo
          </p>
          <p>
            <strong>Velocidad máxima:</strong> 340 km/h
          </p>
        </div>
      </div>

      <div className="data-card drivers-table">
        <h2>Puntos de Pilotos</h2>
        <table>
          <thead>
            <tr>
              <th>Piloto</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index}>
                <td>{driver.name}</td>
                <td>{driver.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data-card constructors-table">
        <h2>Puntos de Constructores</h2>
        <table>
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {constructors.map((team, index) => (
              <tr key={index}>
                <td>{team.name}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default F1Data;
