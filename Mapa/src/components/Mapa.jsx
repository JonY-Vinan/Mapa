/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import Home from "@arcgis/core/widgets/Home";

const Mapa = ({ setMapView, setMapSceneView, baseMap }) => {
  const mapRef = useRef(null);
  const mapRef3D = useRef(null);
  const [is3DView, setIs3DView] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(true);

  const viewRef = useRef(null);
  const view3DRef = useRef(null);

  const toggleView = () => setIs3DView((prev) => !prev);
  const toggleMapVisibility = () => setIsMapVisible((prev) => !prev);

  useEffect(() => {
    if (!mapRef.current || !mapRef3D.current) return;

    const mapConfig = {
      basemap: baseMap?.basemap || "gray-vector",
    };

    viewRef.current = new MapView({
      container: mapRef.current,
      map: new Map(mapConfig),
      center: [-2.92528, 43.26271],
      zoom: 12,
    });

    view3DRef.current = new SceneView({
      container: mapRef3D.current,
      map: new Map({ ...mapConfig, ground: "world-elevation" }),
      center: [-2.92528, 43.26271],
      zoom: 12,
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
    <div className="map-container">
      <div className="map-controls">
        <button className="toggle-button" onClick={toggleView}>
          Cambiar a vista {is3DView ? "2D" : "3D"}
        </button>
      </div>

      <div
        ref={mapRef}
        className={`map-view ${!isMapVisible ? "hidden" : ""}`}
        style={{ height: "80vh", width: "100%" }}
      />

      <div
        ref={mapRef3D}
        className={`scene-view ${!isMapVisible ? "hidden" : ""}`}
        style={{ height: "80vh", width: "100%" }}
      />
    </div>
  );
};

export default Mapa;
