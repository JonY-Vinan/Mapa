import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const F1_TEAMS = {
  Mercedes: ["Lewis Hamilton", "George Russell"],
  RedBull: ["Max Verstappen", "Sergio Pérez"],
  Ferrari: ["Charles Leclerc", "Carlos Sainz"],
  McLaren: ["Lando Norris", "Oscar Piastri"],
  AstonMartin: ["Fernando Alonso", "Lance Stroll"],
  Alpine: ["Esteban Ocon", "Pierre Gasly"],
};

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    contraseña: "",
    f1Team: "",
    favoriteDriver: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar el piloto si se cambia el equipo
    if (name === "f1Team") {
      setFormData((prev) => ({ ...prev, favoriteDriver: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    navigate("/mi_cuenta");
  };

  return (
    <div
      className="container-fluid py-5 d-flex align-items-center"
      style={{
        backgroundImage:
          'url("https://images.squarespace-cdn.com/content/v1/68245ffd9f73984bc78ca002/1726020717.370283-TRNVKBHCNMXWGLDLZJKV/imgg-od3-ovrmkmvv.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        backgroundColor: "rgb(0 0 0 / 45%) !important",
      }}
    >
      <div className="row justify-content-center w-100">
        {/* Formulario dentro de tarjeta */}
        <div className="col-md-6">
          <div
            className="card p-4 shadow-lg"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
            }}
          >
            <h1 className="text-center mb-4 fw-bold text-primary">
              🚀 Únete a la Aventura!
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-secondary">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-secondary">Apellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary">
                  Equipo de F1
                </label>
                <select
                  className="form-select"
                  name="f1Team"
                  value={formData.f1Team}
                  onChange={handleChange}
                  required
                >
                  <option value="">🏎️ Elige tu equipo</option>
                  {Object.keys(F1_TEAMS).map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary">
                  Piloto favorito
                </label>
                <select
                  className="form-select"
                  name="favoriteDriver"
                  value={formData.favoriteDriver}
                  onChange={handleChange}
                  required
                >
                  <option value="">👨‍🏎️ Elige tu piloto</option>
                  {formData.f1Team &&
                    F1_TEAMS[formData.f1Team].map((driver) => (
                      <option key={driver} value={driver}>
                        {driver}
                      </option>
                    ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-3 w-100 fw-bold"
              >
                🚀 ¡Registrarme!
              </button>
            </form>
          </div>
        </div>

        {/* Imagen divertida a la derecha */}
        <div className="col-md-4 d-flex align-items-center justify-content-center mt-5 mt-md-0">
          <img
            src="https://images.squarespace-cdn.com/content/v1/68245ffd9f73984bc78ca002/1726020718.808429-WUVJNELAWWECOBRGWTKI/imgg-od3-vodtycug.png"
            alt="Bienvenido"
            className="img-fluid rounded shadow-lg"
            style={{
              maxHeight: "400px",
              objectFit: "cover",
              animation: "bounce 2s infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Registro;
