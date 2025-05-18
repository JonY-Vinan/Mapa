import React, { useEffect, useState } from "react";

const WeatherInfo = ({ lat, lng }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "XV9F6U4S9FNU99D2NVKQLS5XG";

  useEffect(() => {
    let currentLat = lat || 43.26271;
    let currentLng = lng || -2.93528;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentLat},${currentLng}?key=${API_KEY}&unitGroup=metric&lang=es`
        );
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error("Error al obtener el clima:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lng]);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-primary text-white p-2 text-center">
        {weather && (
          <small className="d-flex justify-content-between align-items-center">
            <span className="badge bg-white text-dark">
              {weather.days[0].datetime}
            </span>
          </small>
        )}
      </div>
      
      <div className="card-body p-2">
        {weather ? (
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="display-6 me-3">{weather.days[0].temp}°</span>
              <div className="d-flex flex-column">
                <small className="text-danger">↑ {weather.days[0].tempmax}°</small>
                <small className="text-success">↓ {weather.days[0].tempmin}°</small>
              </div>
            </div>

            <div className="d-flex gap-2">
              <div className="text-center px-2">
                <small>Lluvia</small>
                <div className="fw-bold">{weather.days[0].precipprob}%</div>
              </div>
              <div className="text-center px-2">
                <small>Viento</small>
                <div className="fw-bold">{weather.days[0].windspeed} km/h</div>
              </div>
              <div className="text-center px-2">
                <small>Humedad</small>
                <div className="fw-bold">{weather.days[0].humidity}%</div>
              </div>
            </div>

            <div className="text-center">
              <img
                src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${weather.days[0].icon}.svg`}
                alt={weather.days[0].conditions}
                style={{ width: "30px", height: "30px" }}
              />
              <small className="d-block">{weather.days[0].conditions}</small>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted">Cargando datos climáticos...</div>
        )}
      </div>
    </div>
  );
};

export default WeatherInfo;