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
      {/* <div>
        <PointsDrivers  idCircuito={idCircuito}/>
      </div>
      
      <div>
        <PoinstConstructors />
      </div> */}
      
    </section>
  );
};

export default F1Data;
