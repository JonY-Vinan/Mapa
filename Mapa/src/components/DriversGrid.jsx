import React from "react";
import "./Drivers.css"; // Asegúrate de crear y vincular este archivo CSS

const drivers = [
  {
    name: "Fernando Alonso",
    team: "Aston Martin",
    starts: 401,
    img: "alonso.png",
    color: "green",
  },
  {
    name: "Lewis Hamilton",
    team: "Ferrari",
    starts: 356,
    img: "hamilton.png",
    color: "red",
  },
  {
    name: "Nico Hulkenberg",
    team: "Sauber",
    starts: 227,
    img: "hulkenberg.png",
    color: "dark-green",
  },
  {
    name: "Max Verstappen",
    team: "Red Bull Racing",
    starts: 209,
    img: "verstappen.png",
    color: "blue",
  },
  {
    name: "Carlos Sainz",
    team: "Ferrari",
    starts: 206,
    img: "sainz.png",
    color: "blue",
  },
  {
    name: "Lance Stroll",
    team: "Aston Martin",
    starts: 166,
    img: "stroll.png",
    color: "blue",
  },
];

const DriversGrid = () => {
  return (
    <div className="container">
      <div className="header">
        <img src="f1-logo.png" alt="F1 Logo" />
        <div className="title">STARTS ON THE GRID</div>
        <div className="subtitle">STARTS PER DRIVER</div>
      </div>
      {drivers.map((driver) => (
        <div key={driver.name} className={`driver ${driver.color}`}>
          <div className="driver-info">
            <img src={driver.img} alt={driver.name} />
            <div>
              <div className="name">{driver.name}</div>
              <div className="team">{driver.team}</div>
            </div>
          </div>
          <div className="driver-starts">{driver.starts} STARTS</div>
        </div>
      ))}
    </div>
  );
};

export default DriversGrid;
