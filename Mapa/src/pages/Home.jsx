import { useState } from "react";

import Capa from "../components/Capa.jsx";
import Mapa from "../components/Mapa.jsx";

function Home() {
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

export default Home;
