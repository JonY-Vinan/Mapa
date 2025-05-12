import { useState } from "react";
import Mapa from "./components/Mapa";
import Capa from "./components/Capa";
import "./App.css";

function App() {
  // useState es un hook de React para manejar estado en componentes funcionales
  const [mapView, setMapView] = useState(null);
  const [mapSceneView, setMapSceneView] = useState(null);

  //Base map
  const [baseMap, setBaseMap] = useState({ basemap: "gray-vector" });

  return (
    <>
      <div>
        {/* <Header /> */}
        <Capa
          mapView={mapView}
          mapSceneView={mapSceneView}
          setBaseMap={setBaseMap}
        />
        {/* <Fichero  mapView={mapView} mapSceneView={mapSceneView} setBaseMap={setBaseMap}/> */}
        <Mapa
          setMapView={setMapView}
          setMapSceneView={setMapSceneView}
          baseMap={baseMap}
        />
      </div>
    </>
  );
}

export default App;
