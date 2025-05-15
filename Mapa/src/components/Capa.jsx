/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";
import "./Capa.css";
// import ServidorMap from "./ServidorMap.jsx";
import CircuitoF1 from "./CircuitosF1.jsx";
const Capa = ({ setBaseMap, toggleLayer, mapView, mapSceneView }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Lista de mapas base
  const [baseMaps] = useState([
    {
      id: "streets",
      title: "Mapa Callejero",
      basemap: "streets",
      visible: true,
    },
    {
      id: "satellite",
      title: "Satélite",
      basemap: "satellite",
      visible: false,
    },
    { id: "topo", title: "Topográfico", basemap: "topo", visible: false },
    { id: "dark-gray", title: "Oscuro", basemap: "dark-gray", visible: false },
    { id: "gray", title: "Claro", basemap: "gray", visible: false },
    { id: "terrain", title: "Terreno", basemap: "terrain", visible: false },
  ]);

  const handleBaseMapChange = useCallback(
    (selectedMap) => {
      setBaseMap(selectedMap);
      // Actualizar estado de visibilidad
      const updatedMaps = baseMaps.map((map) => ({
        ...map,
        visible: map.id === selectedMap.id,
      }));
      // En una aplicación real, podrías querer actualizar el estado local también
    },
    [setBaseMap, baseMaps]
  );

  const handleLayerToggle = useCallback(
    (layer) => {
      toggleLayer(layer);
      // En una aplicación real, actualizarías el estado local también
    },
    [toggleLayer]
  );

  return (
    <div className="capa-container">
      {/* Overlay para cerrar el menú */}
      <div className={`overlay`} />

      <div className={`sidenav ${isNavOpen ? "open" : ""}`} id="navegacion">
        <div className="basemap-list mt-8">
          <h4>Circuitos de F1</h4>
          <CircuitoF1 mapView={mapView} mapSceneView={mapSceneView} />
          {/* <ServidorMap mapView={mapView} mapSceneView={mapSceneView} /> */}
        </div>
      </div>
    </div>
  );
};

export default Capa;
