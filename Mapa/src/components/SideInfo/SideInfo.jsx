import React from "react";
import "./SideInfo.css";
import WeatherInfo from "./WeatherInfo";
import ResultRacer from "./ResultRacer";
import ScheduleRacer from "./ScheduleRacer";
const SideInfo = ({ idCircuito, team_name }) => {
  return (
    <div className="side-info">
      <div id="parte1">
        {/* Horarios */}
        <ScheduleRacer idCircuito={idCircuito} /> {/* Clima */}
        {/* <WeatherInfo lat={lat} long={long} /> */}
      </div>

      {/* Pilotos */}
      <div>
        <ResultRacer idCircuito={idCircuito} team_name={team_name} />
      </div>

      {/* Circuito */}
      <div>{/* <CircuitsInfo /> */}</div>
    </div>
  );
};

export default SideInfo;
