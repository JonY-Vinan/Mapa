import React, { useState } from "react";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    contraseña: "",
    confirmarContraseña: "",
    teamF1: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="container">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombreUsuario" className="form-label">
            Nombre de usuario:
          </label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            className="form-control"
            value={formData.nombreUsuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            className="form-control"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmarContraseña" className="form-label">
            Confirmar contraseña:
          </label>
          <input
            type="password"
            id="confirmarContraseña"
            name="confirmarContraseña"
            className="form-control"
            value={formData.confirmarContraseña}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="teamF1" className="form-label">
            Team F1:
          </label>
          <select
            id="teamF1"
            name="teamF1"
            className="form-select"
            value={formData.teamF1}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un equipo</option>
            <option value="redbull">Red Bull</option>
            <option value="ferrari">Ferrari</option>
            <option value="mercedes">Mercedes</option>
            <option value="mclaren">McLaren</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Registro;
