import { useState } from "react";
import "./Inicio.css";
// import Header from "../components/Header/Header";
import CountrySlider from "../components/CountrySlider/CountrySlider";
import CircuitMap from "../components/CircuitMap/CircuitMap";
import SideInfo from "../components/SideInfo/SideInfo";
import F1Data from "../components/F1Data/F1Data";

function Inicio() {
  const [mapView, setMapView] = useState(null);
  const [mapSceneView, setMapSceneView] = useState(null);
  const [circuitName, setCircuitName] = useState(""); //Base map
  // const [baseMap, setBaseMap] = useState({ basemap: "gray-vector" });

  return (
    <div className="f1-app">
      {/* <Header /> */}
      <CountrySlider mapView={mapView} nameCircuito={setCircuitName} />

      <main className="main-content">
        <div className="map-container">
          <CircuitMap
            setMapView={setMapView}
            setMapSceneView={setMapSceneView}
            nameCircuito={circuitName}
            // baseMap={selectedBasemap}
          />
        </div>
        <div className="info-container">
          <SideInfo />
        </div>
      </main>

      <F1Data />
    </div>
  );
}

export default Inicio;
