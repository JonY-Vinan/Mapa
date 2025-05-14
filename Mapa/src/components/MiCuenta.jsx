import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MiCuenta = () => {
  const location = useLocation();
  const userData = location.state || {
    username: "Usuario",
    email: "correo@example.com",
    f1Team: "Sin equipo",
    favoriteDriver: "Sin piloto",
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Bienvenido, {userData.username}!</h2>
      <div className="row">
        {/* Contenedor de información del usuario */}
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h4>Datos del Usuario</h4>
            <p>
              <strong>Nombre:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        </div>

        {/* Contenedor del equipo de F1 */}
        <div className="col-md-3">
          <div className="card p-4 shadow bg-primary text-white">
            <h4>Equipo de F1</h4>
            <p>{userData.f1Team}</p>
          </div>
        </div>

        {/* Contenedor del piloto favorito */}
        <div className="col-md-3">
          <div className="card p-4 shadow bg-success text-white">
            <h4>Piloto Favorito</h4>
            <p>{userData.favoriteDriver}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiCuenta;
