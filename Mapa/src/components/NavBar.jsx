import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
const NavBar = () => {
  return (
    <>
      {/* Hoverable Sidenav */}
      <div id="mySidenav" className="sidenav">
        <Link className="nav-link" id="inicio" to="/">
          Inicio
        </Link>
        <Link className="nav-link" id="signin" to="/signin">
          Registrarse
        </Link>
        <Link className="nav-link" id="mi_cuenta" to="/mi_cuenta">
          Mi cuenta
        </Link>
        <Link to="/contact" id="contact">
          Contact
        </Link>
      </div>
    </>
  );
};

export default NavBar;
