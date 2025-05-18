// App.jsx
import React , { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Registro from "./pages/Registro";
import MiCuenta from "./pages/MiCuenta";
import Inicio from "./pages/Inicio";

const App = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Cargar usuarios desde localStorage al iniciar
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('usuariosF1');
    if (usuariosGuardados) {
      setUsuarios(JSON.parse(usuariosGuardados));
    }
  }, []);

  // Guardar usuarios en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('usuariosF1', JSON.stringify(usuarios));
  }, [usuarios]);

  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios([...usuarios, nuevoUsuario]);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/signin" element={<Registro agregarUsuario={agregarUsuario} />} />
        <Route path="/mi_cuenta" element={<MiCuenta />} />
      </Routes>
    </Router>
  );
};
export default App;