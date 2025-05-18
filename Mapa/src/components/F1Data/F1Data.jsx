import React from "react";
import "./F1Data.css";
import PointsDrivers from "./PointsDrivers";
import PoinstConstructors from "./PointsConstructors";
import CarsData from "./CarsData";
const F1Data = ({ idCircuito, team_name }) => {
  
 
  return (
    <section className="f1-data-section">
      <div>
        <CarsData team_name={team_name}/>
      </div>
      {/* <div className="data-card car-data">
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
      </div> */}
      <div>
        <PointsDrivers  idCircuito={idCircuito}/>
      </div>
      
      <div>
        <PoinstConstructors />
      </div>
      
    </section>
  );
};

export default F1Data;
