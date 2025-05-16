import React from "react";
import "./Header.css";
import logo from "/public/f1.jpg";

const Header = () => {
  return (
    <header className="f1-header">
      <nav className="menu">
        <img src={logo} alt="Logo F1" className="logo" />
        <a href="#" className="nav-link">
          Home
        </a>
        <button className="login-btn">Iniciar sesión</button>
      </nav>
    </header>
  );
};

export default Header;
