import { useState } from "react";

import Capa from "../components/Capa.jsx";
import Mapa from "../components/Mapa.jsx";
import "./Home.css";
import CircuitoF1 from "../components/CircuitosF1.jsx";
function Home() {
  // useState es un hook de React para manejar estado en componentes funcionales
  const [mapView, setMapView] = useState(null);
  const [mapSceneView, setMapSceneView] = useState(null);

  //Base map
  // const [baseMap, setBaseMap] = useState({ basemap: "gray-vector" });

  return (
    <>
      <div id="map">
        {/* <Header /> */}

        <CircuitoF1 mapView={mapView} mapSceneView={mapSceneView} />
        <Mapa
          setMapView={setMapView}
          setMapSceneView={setMapSceneView}
          // baseMap={baseMap}
        />
      </div>
    </>
  );
}

export default Home;
