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

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    f1Team: "",
    favoriteDriver: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Usuario registrado:", formData);
    navigate("/mi_cuenta");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Formulario de Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
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
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Equipo de F1</label>
              <select
                className="form-select"
                name="f1Team"
                value={formData.f1Team}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un equipo</option>
                {Object.keys(F1_TEAMS).map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Piloto favorito</label>
              <select
                className="form-select"
                name="favoriteDriver"
                value={formData.favoriteDriver}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un piloto</option>
                {formData.f1Team ? (
                  F1_TEAMS[formData.f1Team].map((driver) => (
                    <option key={driver} value={driver}>
                      {driver}
                    </option>
                  ))
                ) : (
                  <option disabled>Primero elige un equipo</option>
                )}
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
