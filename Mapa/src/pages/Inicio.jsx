import { useState } from "react";
import "./Inicio.css";
import CountrySlider from "../components/CountrySlider/CountrySlider";
import CircuitMap from "../components/CircuitMap/CircuitMap";
import SideInfo from "../components/SideInfo/SideInfo";
import CarsData from "../components/F1Data/CarsData";

function Inicio() {
  const [mapView, setMapView] = useState(null);
  const [mapSceneView, setMapSceneView] = useState(null);
  const [circuitName, setCircuitName] = useState("");
  const [idCircuito, setIdCircuito] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState(""); 
  const [piloto_name, setPiloto_name] = useState("");
  const handleDriverSelect = (driverName) => {
    setPiloto_name(driverName);
  };

  return (
    <div className="f1-app">
      <CountrySlider 
        mapView={mapView} 
        circuitName={setCircuitName} 
        idCircuito={setIdCircuito} 
      />

      <main className="main-content">
        <div className="info-car">
          <CarsData piloto_name={piloto_name}/>
        </div>
        <div className="map-container" style={{ height: "60vh", width: "50%" }}>
          <CircuitMap
            setMapView={setMapView}
            setMapSceneView={setMapSceneView}
             nameCircuito={circuitName}
            lat={setLat} 
            long={setLong}
          />
        </div>
        <div className="info-container">
          <SideInfo 
            idCircuito={idCircuito} lat={lat} long={long}
            onDriverSelect={handleDriverSelect}
          />
        </div>
      </main>
    </div>
  );
}

export default Inicio;