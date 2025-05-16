import React, { useEffect, useState } from "react";

const WeatherInfo = () => {
  const [weather, setWeather] = useState(null);
  const API_KEY = "XV9F6U4S9FNU99D2NVKQLS5XG"; // Reemplázalo con tu clave real
  const LAT = "43.7347"; // Coordenadas de Mónaco GP
  const LON = "7.4206";

  useEffect(() => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${LAT},${LON}?key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error al obtener el clima:", error));
  }, []);

  return (
    <section className="weather-info">
      <h2>Pronóstico del Clima</h2>
      {weather ? (
        <>
          <p>
            <strong>Descripción:</strong> {weather.days[0].description}
          </p>
          <p>
            <strong>Temperatura actual:</strong> {weather.days[0].temp}°C
          </p>
          <p>
            <strong>Máxima / Mínima:</strong> {weather.days[0].tempmax}°C /{" "}
            {weather.days[0].tempmin}°C
          </p>
          <p>
            <strong>Probabilidad de lluvia:</strong>{" "}
            {weather.days[0].precipprob}%
          </p>
          <p>
            <strong>Velocidad del viento:</strong> {weather.days[0].windspeed}{" "}
            km/h
          </p>
          <p>
            <strong>Ráfagas de viento:</strong> {weather.days[0].windgust} km/h
          </p>
          <p>
            <strong>Humedad:</strong> {weather.days[0].humidity}%
          </p>
          <p>
            <strong>Presión atmosférica:</strong> {weather.days[0].pressure} hPa
          </p>
          <p>
            <strong>Índice UV:</strong> {weather.days[0].uvindex} (Escala de
            riesgo: Alto)
          </p>
          <p>
            <strong>Salida del sol:</strong> {weather.days[0].sunrise}
          </p>
          <p>
            <strong>Puesta del sol:</strong> {weather.days[0].sunset}
          </p>
        </>
      ) : (
        <p>Cargando clima...</p>
      )}
    </section>
  );
};

export default WeatherInfo;
