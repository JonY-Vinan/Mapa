import React, { useEffect, useState } from "react";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

// API Key y función para obtener los datos de la API
const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlY3VhLndhcnpvbmVAZ21haWwuY29tIiwianRpIjoiOTA4MWUxMjgtNjVhZC00ZjE5LTliMTQtNjliZDcxZGM4MDVmIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3NDcwMzYzMTMsInVzZXJJZCI6IjkwODFlMTI4LTY1YWQtNGYxOS05YjE0LTY5YmQ3MWRjODA1ZiIsInJvbGUiOiIifQ.JKD2KQ4s0rJSw21y3pavuelgEDcehPcxuGIMLd5TuSw";
async function recogerDatos() {
  const url = `https://opendata.aemet.es/opendata/api/maestro/municipios/?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error en la respuesta: " + response.status);
    }
    const data = await response.json();
    console.log(data);
    const estacionesResponse = await fetch(data.datos);
    if (!estacionesResponse.ok) {
      throw new Error(
        "Error al obtener las estaciones: " + estacionesResponse.status
      );
    }
    return await estacionesResponse.json();
  } catch (error) {
    console.error("Hubo un error en la petición:", error);
    return null;
  }
}

// 🧠 Función para convertir coordenadas DMS (texto) a decimal
function convertirDMSTextoADecimal(dms) {
  const regex = /^(\d{2,3})(\d{2})(\d{2})([NSEW])$/;
  const match = dms.match(regex);

  if (!match) {
    console.error("Formato de coordenadas inválido:", dms);
    return null;
  }

  const grados = parseInt(match[1], 10);
  const minutos = parseInt(match[2], 10);
  const segundos = parseInt(match[3], 10);
  const direccion = match[4];

  let decimal = grados + minutos / 60 + segundos / 3600;

  if (direccion === "S" || direccion === "W") {
    decimal *= -1;
  }

  return decimal;
}

const ServidorMap = ({ mapView, mapSceneView }) => {
  const [estaciones, setEstaciones] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const [selectedMunicipioData, setSelectedMunicipioData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await recogerDatos();
      if (data) {
        console.log(data);
        setEstaciones(data);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (estaciones.length > 0) {
      const provinciasList = estaciones
        .map((estacion) => estacion.provincia)
        .filter((value, index, self) => self.indexOf(value) === index);
      setProvincias(provinciasList);
    }
  }, [estaciones]);

  useEffect(() => {
    if (selectedProvincia) {
      const municipiosList = estaciones.filter(
        (estacion) => estacion.provincia === selectedProvincia
      );
      setMunicipios(municipiosList);
    }
  }, [selectedProvincia, estaciones]);

  const handleProvinciaChange = (event) => {
    setSelectedProvincia(event.target.value);
    setSelectedMunicipio("");
    setSelectedMunicipioData(null);
  };

  const handleMunicipioChange = (event) => {
    setSelectedMunicipio(event.target.value);
    setSelectedMunicipioData(null);
  };

  const mostrarEnMapa = () => {
    const municipioData = municipios.find(
      (mun) => mun.nombre === selectedMunicipio
    );

    if (!municipioData) return;

    setSelectedMunicipioData(municipioData);

    if (!municipioData.latitud || !municipioData.longitud) {
      console.error("El municipio no tiene coordenadas definidas");
      return;
    }

    const lat = convertirDMSTextoADecimal(municipioData.latitud);
    const lng = convertirDMSTextoADecimal(municipioData.longitud);

    if (lat === null || lng === null) {
      console.error("No se pudo convertir la latitud o longitud");
      return;
    }

    const point = new Point({
      longitude: lng,
      latitude: lat,
    });

    const marker = new Graphic({
      geometry: point,
      symbol: {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      },
    });

    if (mapView) {
      mapView.graphics.removeAll();
      mapView.graphics.add(marker);
      mapView.goTo({ target: point, zoom: 12 });
    }

    if (mapSceneView) {
      mapSceneView.graphics.removeAll();
      mapSceneView.graphics.add(marker);
      mapSceneView.goTo({ target: point, zoom: 12 });
    }
  };

  return (
    <div className="servidor-map-container">
      <div className="selectors-container">
        <select
          name="provincias"
          className="provincias"
          value={selectedProvincia}
          onChange={handleProvinciaChange}
        >
          <option value="">Seleccione una provincia</option>
          {provincias.map((provincia) => (
            <option key={provincia} value={provincia}>
              {provincia}
            </option>
          ))}
        </select>

        <select
          name="municipios"
          className="municipios"
          value={selectedMunicipio}
          onChange={handleMunicipioChange}
          disabled={!selectedProvincia}
        >
          <option value="">Seleccione un municipio</option>
          {municipios.map((municipio) => (
            <option key={municipio.nombre} value={municipio.nombre}>
              {municipio.nombre}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={mostrarEnMapa}
          disabled={!selectedMunicipio}
          className="show-button"
        >
          Mostrar Municipio
        </button>
      </div>

      {selectedMunicipioData && (
        <div className="municipio-info">
          <h3>{selectedMunicipioData.nombre}</h3>
          <table>
            <tbody>
              {Object.entries(selectedMunicipioData).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServidorMap;
