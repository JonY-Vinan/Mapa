import React, { useEffect, useState, useRef } from "react";
import Graphic from "@arcgis/core/Graphic";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import "./CountrySlider.css";

const CountrySlider = ({ mapView, nameCircuito }) => {
  const [circuitosActivos, setCircuitosActivos] = useState([]);
  const [capasGeoJSON, setCapasGeoJSON] = useState([]);
  const [todosLosCircuitos, setTodosLosCircuitos] = useState([]);
  const [circuitoSeleccionado, setCircuitoSeleccionado] = useState(null);
  const [geoJsonSeleccionado, setGeoJsonSeleccionado] = useState(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [capaVisible, setCapaVisible] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);

  const urlCircuitosActivos = "https://ergast.com/api/f1/2024/races.json";
  const urlTodosLosCircuitos =
    "https://raw.githubusercontent.com/bacinger/f1-circuits/master/f1-locations.geojson";
  const urlRepoGeoJSON =
    "https://api.github.com/repos/bacinger/f1-circuits/contents/circuits";

  // Cargar datos de circuitos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar circuitos activos
        const resActivos = await fetch(urlCircuitosActivos);
        const dataActivos = await resActivos.json();
        console.log(dataActivos);
        setCircuitosActivos(
          dataActivos.MRData.RaceTable.Races.map((c) => ({
            id: c.round,
            name: c.raceName,
            circuitName: c.Circuit.circuitName,
            country: c.Circuit.Location.country,
            location: c.Circuit.Location.locality,
            coordinates: [c.Circuit.Location.long, c.Circuit.Location.lat],
          }))
        );

        // Cargar todos los circuitos
        const resTodos = await fetch(urlTodosLosCircuitos);
        const dataTodos = await resTodos.json();
        setTodosLosCircuitos(
          dataTodos.features.map((f) => ({
            id: f.properties.id,
            name: f.properties.name,
            coordinates: f.geometry.coordinates,
          }))
        );

        // Cargar capas GeoJSON
        const resGeoJSON = await fetch(urlRepoGeoJSON);
        const dataGeoJSON = await resGeoJSON.json();
        const activosIds = dataActivos.map((c) => c.id);
        setCapasGeoJSON(
          dataGeoJSON
            .filter(
              (f) =>
                f.name.endsWith(".geojson") &&
                activosIds.includes(f.name.replace(".geojson", ""))
            )
            .map((a) => ({
              id: a.name.replace(".geojson", ""),
              url: a.download_url,
            }))
        );
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  // Manejar selección de circuito
  const handleSeleccionarCircuito = (id, index) => {
    const circuito = circuitosActivos.find((c) => c.id === id);
    const geo = capasGeoJSON.find((g) => g.id === id);

    if (circuito && nameCircuito) {
      nameCircuito(circuito.name);
      console.log("Circuito seleccionado: " + circuito.name);
    }

    setCircuitoSeleccionado(circuito);
    setGeoJsonSeleccionado(geo);
    if (index !== undefined) setCurrentIndex(index);

    if (circuito && mapView) {
      const [lon, lat] = circuito.coordinates;
      mapView.goTo({ center: [lon, lat], zoom: 14 });
      mapView.graphics.removeAll();
    }
  };

  // Mostrar circuito en el mapa
  useEffect(() => {
    if (!mapView || !geoJsonSeleccionado) return;

    if (capaVisible) {
      mapView.map.remove(capaVisible);
    }

    const nuevaCapa = new GeoJSONLayer({
      url: geoJsonSeleccionado.url,
      opacity: 0.8,
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: "rgba(66, 62, 62, 0)",
          outline: {
            color: "rgba(66, 62, 62, 0.88)",
            width: 3,
          },
        },
      },
    });

    mapView.map.add(nuevaCapa);
    setCapaVisible(nuevaCapa);

    nuevaCapa.when(() => {
      mapView.goTo(nuevaCapa.fullExtent);
    });

    return () => {
      if (mapView && nuevaCapa) {
        mapView.map.remove(nuevaCapa);
      }
    };
  }, [geoJsonSeleccionado, mapView]);

  // Carrusel automático
  useEffect(() => {
    if (circuitosActivos.length === 0 || isPaused) return;

    animationRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % circuitosActivos.length);
      const nextCircuit =
        circuitosActivos[(currentIndex + 1) % circuitosActivos.length];
      handleSeleccionarCircuito(nextCircuit.id);
    }, 5000); // Más lento (5 segundos)

    return () => clearInterval(animationRef.current);
  }, [circuitosActivos, currentIndex, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    clearInterval(animationRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Duplicar circuitos para el efecto de scroll infinito
  const duplicatedCircuits = [...circuitosActivos, ...circuitosActivos];

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h3>Temporada 2025</h3>
        <div className="toggle-container">
          <input
            type="checkbox"
            id="toggle-todos"
            checked={mostrarTodos}
            onChange={() => setMostrarTodos(!mostrarTodos)}
            className="toggle-input"
          />
          <label htmlFor="toggle-todos" className="toggle-label">
            <span className="toggle-switch"></span>
            <span>Mostrar todos</span>
          </label>
        </div>
      </div>

      <div
        className="circuits-carousel infinite-scroll"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="scroll-track">
          {duplicatedCircuits.map((c, index) => (
            <div
              key={`${c.id}-${index}`}
              className={`scroll-item ${
                circuitoSeleccionado?.id === c.id ? "active" : ""
              }`}
              onClick={() =>
                handleSeleccionarCircuito(c.id, index % circuitosActivos.length)
              }
            >
              <span className="circuit-location">{c.location}</span>
              <span className="circuit-name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        {circuitosActivos.map((circuit, index) => (
          <button
            key={index}
            className={`carousel-dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(index);
              handleSeleccionarCircuito(circuit.id, index);
            }}
            aria-label={`Mostrar ${circuit.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CountrySlider;
