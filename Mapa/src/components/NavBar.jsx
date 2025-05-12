import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Opcional: para estilos

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/mapa">Mapa</Link>
        </li>
        <li>
          <Link to="/estaciones">Estaciones</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
