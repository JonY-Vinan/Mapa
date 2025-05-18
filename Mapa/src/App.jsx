import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Registro from "./pages/Registro";
import MiCuenta from "./pages/MiCuenta";
import Inicio from "./pages/Inicio";
// import InicioPrueba from "./pages/InicioPrueba";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/signin" element={<Registro />} />
        <Route path="/mi_cuenta" element={<MiCuenta />} />
      </Routes>
    </Router>
  );
};
export default App;
