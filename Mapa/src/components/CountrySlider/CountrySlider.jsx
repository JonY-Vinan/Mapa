import React, { useEffect, useState } from "react";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import "./CountrySlider.css";

const CountrySlider = ({ mapView, nameCircuito }) => {
  const [circuitos, setCircuitos] = useState([]);
  const [circuitoSeleccionado, setCircuitoSeleccionado] = useState(null);

  const [geoJsonLayer, setGeoJsonLayer] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState([]);
  const [geoJsonDataCircuito, setGeoJsonDataCircuito] = useState("");
  const [geoJsonSeleccionado, setGeoJsonSeleccionado] = useState(null);

  const [capaVisible, setCapaVisible] = useState(null);


  const urlDatosCicuitos = "https://ergast.com/api/f1/2024/races.json";
  const urlMapasCircuitosGeoJSON =
    "https://api.github.com/repos/bacinger/f1-circuits/contents/circuits";

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar datos de los circuitos
        const response = await fetch(urlDatosCicuitos);
        const data = await response.json();
        const circuitosData = data.MRData.RaceTable.Races.map((c) => ({
          id: c.round,
          nombre: c.raceName,
          circuitoName: c.Circuit.circuitName,
          country: c.Circuit.Location.country,
          ubicacion: c.Circuit.Location.locality,
          coordenadas: [
            parseFloat(c.Circuit.Location.long),
            parseFloat(c.Circuit.Location.lat),
          ],
        }));

        // Cargar archivos GeoJSON
        const resGeoJSON = await fetch(urlMapasCircuitosGeoJSON);
        const dataGeoJSON = await resGeoJSON.json();

        // Filtrar solo archivos GeoJSON y mapear con su URL
        const geoJsonFiles = dataGeoJSON
          .filter((file) => file.name.endsWith(".geojson"))
          .map((file) => ({
            name: file.name.replace(".geojson", ""),
            url: file.download_url,
          }));

        setGeoJsonData(geoJsonFiles);
        setCircuitos(circuitosData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  const buscarNombreCircuito = async (url) => {
    try {
      const resGeoJSON = await fetch(url);
      const datosCircuitoGeoJSON = await resGeoJSON.json();
      console.log(datosCircuitoGeoJSON);
      const obteneNombreCircuito = datosCircuitoGeoJSON.features[0].properties.Name;
      console.log(obteneNombreCircuito);
      setGeoJsonDataCircuito(obteneNombreCircuito);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

    // Manejar selección de circuito
  const handleSeleccionarCircuito = async (circuito) => {
  if (!mapView) return;

  // Limpiar capa anterior
  if (geoJsonLayer) {
    mapView.map.remove(geoJsonLayer);
  }

  if (nameCircuito) {
    nameCircuito(circuito.circuitoName);
  }

  // Centrar el mapa
  await mapView.goTo({
    center: circuito.coordenadas,
    zoom: 14,
  });

  // Buscar el GeoJSON correspondiente al circuito
  for (const geo of geoJsonData) {
    try {
      const res = await fetch(geo.url);
      const geoJsonContent = await res.json();
      const nombreCircuitoGeoJSON = geoJsonContent.features[0]?.properties?.Name;
      
      if (nombreCircuitoGeoJSON && nombreCircuitoGeoJSON.toLowerCase() === circuito.circuitoName.toLowerCase()) {
        // Encontramos el GeoJSON correspondiente
        const nuevaCapa = new GeoJSONLayer({
          url: geo.url,
          opacity: 0.8,
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-fill",
              color: "rgba(66, 62, 62, 0)",
              outline: {
                color: "rgba(66, 62, 62, 0.88)",
                width: 3,
              },
            },
          },
        });

        mapView.map.add(nuevaCapa);
        setGeoJsonLayer(nuevaCapa);
        setGeoJsonSeleccionado(geo);
        setCircuitoSeleccionado(circuito);
        return;
      }
    } catch (error) {
      console.error("Error al cargar GeoJSON:", error);
    }
  }

  console.warn(`No se encontró GeoJSON para el circuito: ${circuito.circuitoName}`);
  setCircuitoSeleccionado(circuito);
};

  // Mostrar circuito en el mapa
  useEffect(() => {
    if (!mapView || !geoJsonSeleccionado) return;

    const mostrarCircuito = async () => {
      if (capaVisible) {
        mapView.map.remove(capaVisible);
      }

      const nuevaCapa = new GeoJSONLayer({
        url: geoJsonSeleccionado.url,
        opacity: 0.8,
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: "rgba(66, 62, 62, 0)",
            outline: {
              color: "rgba(66, 62, 62, 0.88)",
              width: 3,
            },
          },
        },
      });

      try {
        await mapView.map.add(nuevaCapa);
        setCapaVisible(nuevaCapa);

        // Ir a la extensión del circuito después de cargar la capa
        nuevaCapa.when(() => {
          mapView.goTo(nuevaCapa.fullExtent).catch(console.error);
        });
      } catch (error) {
        console.error("Error al cargar capa GeoJSON:", error);
      }
    };

    mostrarCircuito();

    return () => {
      if (mapView && capaVisible) {
        mapView.map.remove(capaVisible);
      }
    };
  }, [geoJsonSeleccionado, mapView]);

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h3>Temporada 2025</h3>
      </div>

      <div className="circuits-carousel infinite    -scroll">
        <div className="scroll-track">
          {[...circuitos, ...circuitos].map((circuito, index) => (
            <div
              key={`${circuito.id}-${index}`}
              className={`scroll-item ${
                circuitoSeleccionado?.id === circuito.id ? "active" : ""
              }`}
              onClick={() => handleSeleccionarCircuito(circuito)}
            >
              <span className="circuit-location">{circuito.ubicacion}</span>
              <span className="circuit-name">{circuito.circuitoName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountrySlider;
