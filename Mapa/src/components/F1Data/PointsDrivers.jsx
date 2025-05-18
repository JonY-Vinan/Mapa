import React, { useEffect, useState } from "react";
import "./PointsDrivers.css";
const PointsDrivers = ({ idCircuito }) => {
  const [drivers, setDrivers] = useState([]);
  const [id, setId] = useState(1); // Valor inicial 1

  // Actualiza `id` solo cuando `idCircuito` cambie
  useEffect(() => {
    if (idCircuito) {
      setId(idCircuito);
    } else {
      console.log("No hay idCircuito, usando valor por defecto (1)");
    }
  }, [idCircuito]);

  const API_URL = `https://ergast.com/api/f1/2024/driverStandings.json`;

  useEffect(() => {
    const cargarPosiciones = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Asegúrate de mapear correctamente los datos de la API
        const driversData =
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings?.map(
            (result) => ({
              full_name: `${result?.Driver?.givenName} ${result?.Driver?.familyName}`,
              // team_name: result.Constructor.name,
              position: result.position,
              points: result.points,
            })
          );
        setDrivers(driversData || []);
      } catch (error) {
        console.error("Error al cargar posiciones:", error);
      }
    };

    cargarPosiciones();
  }, [API_URL]); // Dependencia: `API_URL` (que depende de `id`)

  return (
    <div className="data-card drivers-table">
      <h6>Puntos de Pilotos</h6>

      {/* <table>
        <thead>
          <tr>
            <th>Piloto</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <div>
          <tbody>
           
              <tr key={index}>
                <td>{driver.full_name}</td>
                <td>{driver.points}</td>
              </tr>
          
          </tbody>
        </div>
      </table> */}
    </div>
  );
};

export default PointsDrivers;
