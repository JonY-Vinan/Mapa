import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

const Mapa = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    // Crear el mapa sin API Key (usará un basemap público)
    const map = new Map({
      basemap: "streets-navigation-vector", // Opciones gratuitas: "osm", "streets", "topo", etc.
    });

    // Crear la vista del mapa
    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-3.7038, 40.4168], // Madrid, España
      zoom: 5,
    });

    return () => {
      // Limpiar la vista al desmontar el componente
      if (view) view.destroy();
    };
  }, []);

  return <div ref={mapDiv} style={{ width: "100%", height: "100vh" }} />;
};

export default Mapa;
