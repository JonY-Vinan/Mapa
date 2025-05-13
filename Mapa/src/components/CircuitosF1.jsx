import React, { useEffect, useState } from "react";
import Graphic from "@arcgis/core/Graphic";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

const CircuitoF2 = ({ mapView }) => {
  const [circuitosF1, setCircuitosF1] = useState([]);
  const [listacp, setListacp] = useState([]);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [selectedGeoJSON, setSelectedGeoJSON] = useState(null);
  const [showCircuit, setShowCircuit] = useState(false);
  const [geoJsonLayer, setGeoJsonLayer] = useState(null); // Guardamos la capa GeoJSON

  const apiUrlJson =
    "https://raw.githubusercontent.com/bacinger/f1-circuits/master/championships/f1-locations-2025.json";
  const apiUrl =
    "https://api.github.com/repos/bacinger/f1-circuits/contents/circuits";

  useEffect(() => {
    const obtenerArchivosJSON = async () => {
      try {
        const response = await fetch(apiUrlJson);
        const data = await response.json();

        const circuitos = data.map((archivojson) => ({
          id: archivojson.id,
          name: archivojson.name,
          coordinates: [archivojson.lon, archivojson.lat],
        }));

        setCircuitosF1(circuitos);
      } catch (error) {
        console.error("Error al obtener circuitos:", error);
      }
    };

    obtenerArchivosJSON();
  }, []);

  useEffect(() => {
    if (circuitosF1.length === 0) return;

    const obtenerArchivosGeoJSON = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const archivosGeoJSON = data.filter((archivo) =>
          archivo.name.endsWith(".geojson")
        );

        const circuitosIds = circuitosF1.map((circuito) => circuito.id);

        const nuevosCircuitos = archivosGeoJSON
          .filter((archivo) =>
            circuitosIds.includes(archivo.name.replace(".geojson", ""))
          )
          .map((archivo) => ({
            id: archivo.name.replace(".geojson", ""),
            url: archivo.download_url,
            type: "GeoJSONLayer",
            visible: false,
          }));

        setListacp(nuevosCircuitos);
      } catch (error) {
        console.error("Error al obtener archivos GeoJSON:", error);
      }
    };

    obtenerArchivosGeoJSON();
  }, [circuitosF1]);

  const handleSelectCircuit = (id) => {
    const circuitoSeleccionado = circuitosF1.find(
      (circuito) => circuito.id === id
    );
    setSelectedCircuit(circuitoSeleccionado);
    setSelectedGeoJSON(listacp.find((circuito) => circuito.id === id));
    setShowCircuit(false);

    if (circuitoSeleccionado && mapView) {
      const [longitude, latitude] = circuitoSeleccionado.coordinates;

      mapView.goTo({ center: [longitude, latitude], zoom: 14 });

      const point = { type: "point", longitude, latitude };
      const symbol = { type: "simple-marker", color: "red", size: "12px" };

      const graphic = new Graphic({ geometry: point, symbol });

      mapView.graphics.removeAll();
      mapView.graphics.add(graphic);
    }
  };

  const handleToggleCircuit = (e) => {
    const checked = e.target.checked;
    setShowCircuit(checked);

    if (!checked && geoJsonLayer) {
      mapView.map.remove(geoJsonLayer);
      setGeoJsonLayer(null);
    } else if (checked && selectedGeoJSON && mapView) {
      const layer = new GeoJSONLayer({
        url: selectedGeoJSON.url,
        opacity: 0.8,
      });

      mapView.map.add(layer);
      setGeoJsonLayer(layer);

      mapView.goTo({
        target: layer.fullExtent,
        zoom: 14,
      });
    }
  };

  return (
    <div>
      <h2>Circuito F2</h2>

      {/* Selector para los circuitos F1 con checkbox */}
      <div>
        <label htmlFor="circuit-select">Selecciona un Circuito F1:</label>
        <select
          id="circuit-select"
          onChange={(e) => handleSelectCircuit(e.target.value)}
        >
          <option value="">Seleccione un circuito</option>
          {circuitosF1.map((circuito) => (
            <option key={circuito.id} value={circuito.id}>
              {circuito.name}
            </option>
          ))}
        </select>

        {/* Checkbox para mostrar el circuito completo */}
        {selectedCircuit && (
          <div>
            <input
              type="checkbox"
              id="show-circuit"
              checked={showCircuit}
              onChange={handleToggleCircuit}
            />
            <label htmlFor="show-circuit">Mostrar el circuito en el mapa</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircuitoF2;
