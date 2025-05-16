import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import Home from "@arcgis/core/widgets/Home";
import "./CircuitMap.css";

const CircuitMap = ({
  setMapView,
  setMapSceneView,
  nameCircuito, // Ahora recibimos directamente el nombre
  baseMap,
}) => {
  const mapRef = useRef(null);
  const mapRef3D = useRef(null);
  const [is3DView, setIs3DView] = useState(false);

  const viewRef = useRef(null);
  const view3DRef = useRef(null);

  const toggleView = () => setIs3DView((prev) => !prev);

  useEffect(() => {
    if (!mapRef.current || !mapRef3D.current) return;

    const mapConfig = {
      basemap: baseMap?.basemap || "gray-vector",
    };

    viewRef.current = new MapView({
      container: mapRef.current,
      map: new Map(mapConfig),
      center: [-2.92528, 43.26271],
      zoom: 4,
    });

    view3DRef.current = new SceneView({
      container: mapRef3D.current,
      map: new Map({ ...mapConfig, ground: "world-elevation" }),
      center: [-2.92528, 43.26271],
      zoom: 6,
    });

    const homeWidget = new Home({
      view: viewRef.current,
    });
    viewRef.current.ui.add(homeWidget, "top-left");

    setMapView(viewRef.current);
    setMapSceneView(view3DRef.current);

    mapRef3D.current.style.display = "none";

    return () => {
      if (viewRef.current) viewRef.current.destroy();
      if (view3DRef.current) view3DRef.current.destroy();
    };
  }, [baseMap, setMapView, setMapSceneView]);

  useEffect(() => {
    if (!mapRef.current || !mapRef3D.current) return;

    if (is3DView) {
      mapRef.current.style.display = "none";
      mapRef3D.current.style.display = "block";
    } else {
      mapRef.current.style.display = "block";
      mapRef3D.current.style.display = "none";
    }
  }, [is3DView]);

  return (
    <div className="circuit-map-container">
      <div className="map-header">
        <div className="map-title">
          <img
            src="/bandera.png"
            alt="Bandera de España"
            className="country-flag"
          />
          <div className="title-content">
            <h1>{nameCircuito || "Selecciona un circuito"}</h1>
          </div>
        </div>

        <div className="map-controls">
          <button
            onClick={toggleView}
            className={`view-toggle ${is3DView ? "active" : ""}`}
            aria-label="Cambiar vista 2D/3D"
          >
            {is3DView ? "2D" : "3D"}
          </button>
        </div>
      </div>

      <div className="map-wrapper">
        <div
          ref={mapRef}
          className={`map-view ${is3DView ? "hidden" : ""}`}
          aria-hidden={is3DView}
        />
        <div
          ref={mapRef3D}
          className={`scene-view ${!is3DView ? "hidden" : ""}`}
          aria-hidden={!is3DView}
        />
      </div>

      <div className="map-status-bar">
        <div className="coordinates-display">
          <span>Lat: 43.26271</span>
          <span>Lon: -2.92528</span>
          <span>
            Zoom: {is3DView ? view3DRef.current?.zoom : viewRef.current?.zoom}
          </span>
        </div>
        <div className="basemap-info">
          Mapa base: {baseMap?.title || "Predeterminado"}
        </div>
      </div>
    </div>
  );
};

export default CircuitMap;
