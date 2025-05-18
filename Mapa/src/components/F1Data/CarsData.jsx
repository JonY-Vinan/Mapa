import React, { useState, useEffect } from 'react';
import carsData from './Cars.json';

const CarsData = () => {
  const [car] = useState({
    model: "RB20",
    team_name: "Red Bull Racing",
    engine: {
      manufacturer: "Honda RBPT",
      model: "H001",
      type: "V6 Turbo Híbrido",
      horsepower: "950+"
    },
    performance: {
      max_speed: "340+ km/h",
      "0_to_100_kmh": "2.5s"
    },
    color: "Azul oscuro",
    color_code: "#0600EF",
    image_url: "./f1.jpg",
    best_laps: [
      {
        circuit: "Circuito de Barcelona-Cataluña",
        best_lap_time: "1:12.345",
        top_speed: "325 km/h"
      }
    ]
  });
  
  return (
    // Información del coche
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-danger text-white">
        <h3 className="m-0">
          {car.model} - {car.team_name}
        </h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <div className="mb-4">
              <h4>Especificaciones del Motor</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Fabricante:</span>
                  <span className="fw-bold">{car.engine.manufacturer}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Modelo:</span>
                  <span className="fw-bold">{car.engine.model}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Tipo:</span>
                  <span className="fw-bold">{car.engine.type}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Potencia:</span>
                  <span className="fw-bold">{car.engine.horsepower} HP</span>
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h4>Rendimiento</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Velocidad máxima:</span>
                  <span className="fw-bold">{car.performance.max_speed}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Aceleración 0-100 km/h:</span>
                  <span className="fw-bold">{car.performance["0_to_100_kmh"]}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4">
            <div className="text-center mb-3">
              <img
                src={car.image_url}
                alt={`${car.model} de ${car.team_name}`}
                className="img-fluid rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "./f1.jpg";
                }}
              />
              <div className="mt-2">
                <span className="fw-bold me-2">Color:</span>
                <span
                  className="d-inline-block rounded-circle me-2"
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: car.color_code,
                    verticalAlign: "middle",
                  }}
                ></span>
                <span>{car.color}</span>
              </div>
            </div>
          </div>
        </div>

        {car.best_laps?.length > 0 && (
          <div className="mt-4">
            <h4>Mejores vueltas</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Circuito</th>
                    <th>Mejor tiempo</th>
                    <th>Velocidad máxima</th>
                  </tr>
                </thead>
                <tbody>
                  {car.best_laps.map((lap, index) => (
                    <tr key={index}>
                      <td>{lap.circuit}</td>
                      <td>{lap.best_lap_time}</td>
                      <td>{lap.top_speed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsData;