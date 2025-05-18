import React, { useState, useEffect } from "react";
import carsData from "./Cars.json";

const CarsData = ({ piloto_name }) => {
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [activeSpecTab, setActiveSpecTab] = useState("engine");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedTeamData, setSelectedTeamData] = useState(null);

  useEffect(() => {
    if (piloto_name) {
      // Buscar el piloto en todos los equipos
      for (const team of carsData.teams) {
        const driver = team.drivers.find((d) => {
          const fullName = `${d.givenName || ""} ${d.familyName || ""}`.trim();
          return fullName === piloto_name || d.name === piloto_name;
        });

        if (driver) {
          setSelectedDriver(driver);
          setSelectedTeamData(team);
          setSelectedTeam(carsData.teams.indexOf(team));
          break;
        }
      }
    }
  }, [piloto_name]);

  // Si no hay piloto seleccionado, usar el primer piloto del equipo seleccionado
  const team = selectedTeamData || carsData.teams[selectedTeam];
  const car = team?.car;
  const driverToShow =
    selectedDriver || (team?.drivers?.length > 0 ? team.drivers[0] : null);

  if (!team || !car || !driverToShow) {
    return <div className="container mt-4">Cargando datos del coche...</div>;
  }

  return (
    <div className="container">
      {/* Selector de equipo */}
      {/* <div className="mb-4">
        <label htmlFor="team-select" className="form-label">Selecciona un equipo:</label>
        <select 
          id="team-select" 
          className="form-select"
          value={selectedTeam}
          onChange={(e) => {
            const newIndex = parseInt(e.target.value);
            setSelectedTeam(newIndex);
            setSelectedTeamData(null);
            setSelectedDriver(null);
          }}
        >
          {carsData.teams.map((team, index) => (
            <option key={index} value={index}>
              {team.name}
            </option>
          ))}
        </select>
      </div> */}

      {/* Tarjeta del coche */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-danger text-white">
          <h3 className="m-0">
            {car.model} - {team.name}
          </h3>
          <p className="m-0">
            <small>
              Base: {team.base} | Jefe de equipo: {team.team_principal}
            </small>
          </p>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="text-center mb-3">
                <img
                  src={car.image_url}
                  alt={`${car.model} de ${team.name}`}
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
            {/* Pilotos */}
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="m-0">Pilotos</h5>
              </div>
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <div className="fw-bold">
                    #{driverToShow.number} {driverToShow.givenName}{" "}
                    {driverToShow.familyName}
                  </div>
                  <div className="small">
                    Nacionalidad: {driverToShow.nationality}
                    <br />
                    Fecha de nacimiento: {driverToShow.date_of_birth}
                    <br />
                    Campeonatos: {driverToShow.world_championships}
                    <br />
                    Podios: {driverToShow.podiums}
                    <br />
                    Puntos: {driverToShow.points}
                    <br />
                    Carreras: {driverToShow.grands_prix_entered}
                    <br />
                    Mejor resultado: {driverToShow.highest_race_finish}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {/* Especificaciones técnicas con pestañas */}
            <div className="tech-specs-container">
              {/* Barra de pestañas */}
              <div className="tabs-container mb-3">
                <button
                  className={`tab-btn ${
                    activeSpecTab === "engine" ? "active" : ""
                  }`}
                  onClick={() => setActiveSpecTab("engine")}
                >
                  Motor
                </button>
                <button
                  className={`tab-btn ${
                    activeSpecTab === "performance" ? "active" : ""
                  }`}
                  onClick={() => setActiveSpecTab("performance")}
                >
                  Rendimiento
                </button>
                <button
                  className={`tab-btn ${
                    activeSpecTab === "chassis" ? "active" : ""
                  }`}
                  onClick={() => setActiveSpecTab("chassis")}
                >
                  Chasis
                </button>
              </div>

              {/* Contenido de las pestañas */}
              <div className="tab-content">
                {activeSpecTab === "engine" && (
                  <div className="specs-section">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Fabricante:</span>
                        <span className="fw-bold">
                          {car.engine.manufacturer}
                        </span>
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
                        <span className="fw-bold">
                          {car.engine.horsepower} HP
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Sistema de recuperación de energía:</span>
                        <span className="fw-bold">
                          {car.engine.energy_recovery_system}
                        </span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeSpecTab === "performance" && (
                  <div className="specs-section">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Velocidad máxima:</span>
                        <span className="fw-bold">
                          {car.performance.max_speed}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Aceleración 0-100 km/h:</span>
                        <span className="fw-bold">
                          {car.performance["0_to_100_kmh"]}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Aceleración 0-200 km/h:</span>
                        <span className="fw-bold">
                          {car.performance["0_to_200_kmh"]}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Downforce a 200 km/h:</span>
                        <span className="fw-bold">
                          {car.performance.downforce_at_200kmh}
                        </span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeSpecTab === "chassis" && (
                  <div className="specs-section">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Material:</span>
                        <span className="fw-bold">{car.chassis.material}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Tipo:</span>
                        <span className="fw-bold">{car.chassis.type}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Distribución de peso:</span>
                        <span className="fw-bold">
                          {car.chassis.weight_distribution}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Dimensiones:</span>
                        <span className="fw-bold">
                          {car.chassis.dimensions.length} (L) ×{" "}
                          {car.chassis.dimensions.width} (W) ×{" "}
                          {car.chassis.dimensions.height} (H)
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Peso:</span>
                        <span className="fw-bold">
                          {car.chassis.dimensions.weight}
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Mejores vueltas */}
          {car.best_laps?.length > 0 && (
            <div className="mt-4">
              <h4>Mejores vueltas</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Circuito</th>
                      <th>Longitud</th>
                      <th>Mejor tiempo</th>
                      <th>Velocidad máxima</th>
                    </tr>
                  </thead>
                  <tbody>
                    {car.best_laps.map((lap, index) => (
                      <tr key={index}>
                        <td>{lap.circuit}</td>
                        <td>{lap.circuit_length}</td>
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
    </div>
  );
};

export default CarsData;
