import React, { useState, useCallback } from "react";
import CircuitoF1 from "./CircuitosF1.jsx";

const Capa = ({ setBaseMap, toggleLayer, mapView, mapSceneView }) => {
  const [activeTab, setActiveTab] = useState("circuitos");

  const baseMaps = [
    { id: "streets", title: "🌍 Calles", basemap: "streets" },
    { id: "satellite", title: "🛰️ Satélite", basemap: "satellite" },
    { id: "topo", title: "🗺️ Topográfico", basemap: "topo" },
    { id: "dark-gray", title: "🌑 Oscuro", basemap: "dark-gray" },
    { id: "gray", title: "☀️ Claro", basemap: "gray" },
    { id: "terrain", title: "⛰️ Terreno", basemap: "terrain" },
  ];

  const handleBaseMapChange = useCallback(
    (selectedMap) => {
      setBaseMap(selectedMap);
    },
    [setBaseMap]
  );

  return (
    <>
      {/* Botón flotante */}
      <button
        className="btn btn-primary position-fixed top-0 start-0 m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarF1"
        aria-controls="sidebarF1"
      >
        ☰
      </button>

      {/* Panel lateral */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sidebarF1"
        aria-labelledby="sidebarF1Label"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="sidebarF1Label">
            🏁 F1 Dashboard
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column">
          {/* Interruptor de tema */}

          {/* Tabs Bootstrap */}
          <ul className="nav nav-tabs mb-3" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${
                  activeTab === "circuitos" ? "active" : ""
                }`}
                onClick={() => setActiveTab("circuitos")}
                type="button"
                role="tab"
              >
                🏎️ Circuitos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "mapas" ? "active" : ""}`}
                onClick={() => setActiveTab("mapas")}
                type="button"
                role="tab"
              >
                🗺️ Mapas Base
              </button>
            </li>
          </ul>

          {/* Contenido de las pestañas */}
          <div className="tab-content flex-grow-1 overflow-auto">
            {activeTab === "circuitos" && (
              <div className="tab-pane fade show active">
                <CircuitoF1 mapView={mapView} mapSceneView={mapSceneView} />
              </div>
            )}
            {activeTab === "mapas" && (
              <div className="tab-pane fade show active">
                <h5 className="mb-3">Estilo del Mapa</h5>
                <div className="d-grid gap-2">
                  {baseMaps.map((map) => (
                    <button
                      key={map.id}
                      className="btn btn-outline-secondary"
                      onClick={() => handleBaseMapChange(map)}
                    >
                      {map.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-muted small">
            Temporada 2025
          </div>
        </div>
      </div>
    </>
  );
};

export default Capa;
