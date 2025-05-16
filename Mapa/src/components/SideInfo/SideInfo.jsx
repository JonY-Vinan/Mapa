import React from "react";
import "./SideInfo.css";
import WeatherInfo from "./WeatherInfo";
import PitStop from "./PitStop";

const SideInfo = () => {
  return (
    <div className="side-info">
      {/* Clima */}
      <div>
        <WeatherInfo />
      </div>
      {/* <section className="weather-info">
        <h2>Pronóstico del Clima</h2>
        {weather ? (
          <p>
            {weather.temp}°C - {weather.condition}
          </p>
        ) : (
          <p>Cargando clima...</p>
        )}
      </section> */}

      {/* Horarios */}

      {/* Pilotos */}
      <div>
        <PitStop />
      </div>

      {/* Circuito */}
      <div>{/* <CircuitsInfo /> */}</div>
    </div>
  );
};

export default SideInfo;
