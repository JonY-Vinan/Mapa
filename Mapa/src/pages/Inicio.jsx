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

  const [idCircuito, setIdCircuito] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState(""); 
  const [team_name, setTeam_name] = useState("");
  // const [baseMap, setBaseMap] = useState({ basemap: "gray-vector" });

  return (
    <div className="f1-app">
      {/* <Header /> */}
      <CountrySlider mapView={mapView} circuitName={setCircuitName} 
      idCircuito={setIdCircuito} />

      <main className="main-content">
        <div className="map-container"  style={{ height: "60vh", width: "50%" }}>
          <CircuitMap
            setMapView={setMapView}
            setMapSceneView={setMapSceneView}
            nameCircuito={circuitName}
            lat={setLat} long={setLong}
            // baseMap={selectedBasemap}
          />
        </div>
        <div className="info-container">
          <SideInfo idCircuito={idCircuito} team_name={setTeam_name}/>
        </div>
      </main>

      <F1Data idCircuito={setIdCircuito} team_name={team_name}/>
    </div>
  );
}

export default Inicio;
