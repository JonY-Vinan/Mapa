import React, { useState } from "react";
import "./SideInfo.css";
import WeatherInfo from "./WeatherInfo";
import ResultRacer from "./ResultRacer";
import PointsConstructors from "../F1Data/PointsConstructors";
import PointsDrivers from "../F1Data/PointsDrivers";
import ScheduleRacer from "./ScheduleRacer";

const SideInfo = ({ idCircuito, onDriverSelect, lat,
  lng }) => {
  const [activeTab, setActiveTab] = useState('results');

  return (
    <div className="side-info">
      <ScheduleRacer idCircuito={idCircuito} />
      <nav className="navbar-selector">
        <div className="nav-container">
          <button 
            className={`nav-item ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            <span className="nav-icon">🏁</span>
            <span className="nav-text">Resultados</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'pilotos' ? 'active' : ''}`}
            onClick={() => setActiveTab('pilotos')}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">Puntos Pilotos</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'contructores' ? 'active' : ''}`}
            onClick={() => setActiveTab('contructores')}
          >
            <span className="nav-icon">🏎️</span>
            <span className="nav-text">Puntos Constructores</span>
          </button>
        </div>
      </nav>

      <div className="tab-content">
        {activeTab === 'results' && (
          <div>
            <ResultRacer 
              idCircuito={idCircuito} 
              onDriverClick={onDriverSelect}
            />
          </div>
        )}
        {activeTab === 'pilotos' && (
          <div>
            <PointsDrivers idCircuito={idCircuito} />
          </div>
        )}
        {activeTab === 'contructores' && (
          <div>
            <PointsConstructors idCircuito={idCircuito} />
          </div>
        )}
      </div>

      <div>
           <WeatherInfo lat={lat} lng={lng} />
      </div>
    </div>
  );
};

export default SideInfo;