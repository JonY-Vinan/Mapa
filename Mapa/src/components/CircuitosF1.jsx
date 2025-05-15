import React, { useEffect, useState } from "react";
import Graphic from "@arcgis/core/Graphic";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import PosicionPilotos from "./PosicionPilotos";
// import "./CircuitosF1.css";

const CircuitoF1 = ({ mapView }) => {
  const [circuitosActivos, setCircuitosActivos] = useState([]);
  const [capasGeoJSON, setCapasGeoJSON] = useState([]);
  const [todosLosCircuitos, setTodosLosCircuitos] = useState([]);
  const [circuitoSeleccionado, setCircuitoSeleccionado] = useState(null);
  const [geoJsonSeleccionado, setGeoJsonSeleccionado] = useState(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [capaVisible, setCapaVisible] = useState(null);

  const urlCircuitosActivos =
    "https://raw.githubusercontent.com/bacinger/f1-circuits/master/championships/f1-locations-2025.json";
  const urlTodosLosCircuitos =
    "https://raw.githubusercontent.com/bacinger/f1-circuits/master/f1-locations.geojson";
  const urlRepoGeoJSON =
    "https://api.github.com/repos/bacinger/f1-circuits/contents/circuits";

  // Cargar circuitos activos (lat/lon simples)
  useEffect(() => {
    const cargarCircuitosActivos = async () => {
      try {
        const res = await fetch(urlCircuitosActivos);
        const data = await res.json();

        const circuitos = data.map((c) => ({
          id: c.id,
          name: c.name,
          location: c.location,
          coordinates: [c.lon, c.lat],
        }));

        setCircuitosActivos(circuitos);
      } catch (error) {
        console.error("Error al cargar circuitos activos:", error);
      }
    };

    cargarCircuitosActivos();
  }, []);

  // Cargar todos los circuitos desde archivo GeoJSON
  useEffect(() => {
    const cargarTodosLosCircuitos = async () => {
      try {
        const res = await fetch(urlTodosLosCircuitos);
        const data = await res.json();

        const circuitos = data.features.map((f) => ({
          id: f.properties.id,
          name: f.properties.name,
          coordinates: f.geometry.coordinates,
        }));

        setTodosLosCircuitos(circuitos);
      } catch (error) {
        console.error("Error al cargar todos los circuitos:", error);
      }
    };

    cargarTodosLosCircuitos();
  }, []);

  // Cargar los archivos .geojson de cada circuito
  useEffect(() => {
    if (circuitosActivos.length === 0) return;

    const cargarCapasGeoJSON = async () => {
      try {
        const res = await fetch(urlRepoGeoJSON);
        const data = await res.json();

        const archivos = data.filter((f) => f.name.endsWith(".geojson"));
        const activosIds = circuitosActivos.map((c) => c.id);

        const capas = archivos
          .filter((a) => activosIds.includes(a.name.replace(".geojson", "")))
          .map((a) => ({
            id: a.name.replace(".geojson", ""),
            url: a.download_url,
          }));

        setCapasGeoJSON(capas);
      } catch (error) {
        console.error("Error al cargar capas GeoJSON:", error);
      }
    };

    cargarCapasGeoJSON();
  }, [circuitosActivos]);

  // Mostrar el circuito cuando se selecciona
  useEffect(() => {
    if (!mapView || !geoJsonSeleccionado) return;

    if (capaVisible) {
      mapView.map.remove(capaVisible);
      setCapaVisible(null);
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
  }, [geoJsonSeleccionado, mapView]);

  const handleSeleccionarCircuito = (id) => {
    if (!id) {
      setCircuitoSeleccionado(null);
      setGeoJsonSeleccionado(null);
      return;
    }

    const circuito = circuitosActivos.find((c) => c.id === id);
    const geo = capasGeoJSON.find((g) => g.id === id);

    setCircuitoSeleccionado(circuito);
    setGeoJsonSeleccionado(geo);

    if (circuito && mapView) {
      const [lon, lat] = circuito.coordinates;
      mapView.goTo({ center: [lon, lat], zoom: 14 });
      mapView.graphics.removeAll();
    }
  };

  const handleToggleTodos = () => {
    const mostrar = !mostrarTodos;
    setMostrarTodos(mostrar);

    if (!mapView) return;

    mapView.graphics.removeAll();

    if (mostrar) {
      todosLosCircuitos.forEach((c) => {
        const punto = {
          type: "point",
          longitude: c.coordinates[0],
          latitude: c.coordinates[1],
        };

        const simbolo = {
          type: "simple-marker",
          color: "blue",
          size: "12px",
        };

        const marcador = new Graphic({ geometry: punto, symbol: simbolo });
        mapView.graphics.add(marcador);
      });

      mapView.goTo({
        target: todosLosCircuitos.map((c) => ({
          longitude: c.coordinates[0],
          latitude: c.coordinates[1],
        })),
        zoom: 5,
      });
    }
  };

  const getColor = (index) => {
    const colors = [
      "#04AA6D",
      "#2196F3",
      "#f44336",
      "#555",
      "#FFA500",
      "#800080",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="circuitos-container">
      <div className="controls-panel">
        <div className="toggle-container">
          <input
            type="checkbox"
            id="toggle-todos"
            checked={mostrarTodos}
            onChange={handleToggleTodos}
            className="toggle-input"
          />
          <label htmlFor="toggle-todos" className="toggle-label">
            <span className="toggle-switch"></span>
            <span className="toggle-text">Mostrar todos los circuitos</span>
          </label>
        </div>

        <div className="circuitos-list">
          <h3 className="circuitos-title">Temporada 2025</h3>
          <div className="circuitos-scroll">
            {circuitosActivos.map((c, index) => (
              <button
                key={c.id}
                className={`circuito-btn ${
                  circuitoSeleccionado?.id === c.id ? "active" : ""
                }`}
                onClick={() => handleSeleccionarCircuito(c.id)}
                style={{
                  borderLeft: `4px solid ${getColor(index)}`,
                }}
              >
                <span className="circuito-location">{c.location}</span>
                <span className="circuito-name">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitoF1;
