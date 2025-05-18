import React, { useState, useEffect } from 'react';
import carsData from './Cars.json';

const CarsData = ({ team_name }) => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const team = carsData.teams.find(t => t.name === team_name);
      if (!team) throw new Error(`No se encontró el equipo: ${team_name}`);
      
      setCar(team.car);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [team_name]);

  if (loading) return <div className="text-center p-4">Cargando los datos del coche...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!car) return <div className="alert alert-warning">No se encontraron datos del coche.</div>;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-danger text-white">
        <h3 className="m-0">{car.model} - {team_name}</h3>
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
                alt={`${car.model} de ${team_name}`}
                className="img-fluid rounded"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/400x200?text=Imagen+no+disponible';
                }}
              />
              <div className="mt-2">
                <span className="fw-bold me-2">Color:</span>
                <span 
                  className="d-inline-block rounded-circle me-2"
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: car.color_code,
                    verticalAlign: 'middle'
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