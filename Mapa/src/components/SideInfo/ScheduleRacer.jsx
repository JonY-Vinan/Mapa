import React, { useEffect, useState } from "react";
import "./ScheduleRace.css";

const ScheduleRacer = ({ idCircuito }) => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" }).replace(" ", "");
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("https://ergast.com/api/f1/current.json");
        const data = await response.json();
        const raceIndex = idCircuito ? idCircuito - 1 : 0;
        const raceData = data.MRData.RaceTable.Races[raceIndex];
        
        if (raceData) {
          setSchedule({
            circuitName: raceData.Circuit.circuitName,
            country: raceData.Circuit.Location.country,
            sessions: [
              {
                name: "Practice 1",
                date: raceData.FirstPractice.date,
                time: raceData.FirstPractice.time,
                duration: 60
              },
              {
                name: "Practice 2",
                date: raceData.SecondPractice.date,
                time: raceData.SecondPractice.time,
                duration: 60
              },
              {
                name: "Qualifying",
                date: raceData.Qualifying.date,
                time: raceData.Qualifying.time,
                duration: 60
              },
              {
                name: "Race",
                date: raceData.date,
                time: raceData.time,
                duration: 120,
                isHighlight: true
              }
            ]
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [idCircuito]);

  if (loading) return <div className="schedule-loading">Loading schedule...</div>;
  if (!schedule) return <div className="schedule-error">No schedule data available.</div>;

  return (
    <div className="schedule-card">
      <div className="schedule-card-header">
        <h6>Horarios</h6>
        {/* <span className="schedule-country">{schedule.country}</span> */}
      </div>
      
      <div className="schedule-card-body">
        {schedule.sessions.map((session, index) => (
          <div key={index} className={`schedule-item ${session.isHighlight ? 'highlight' : ''}`}>
            <div className="schedule-date">
              {formatDate(session.date)}
            </div>
            <div className="schedule-session">
              <span className="session-name">{session.name}</span>
            </div>
            <div className="schedule-hours">              
              <span className="session-time">{formatTime(`${session.date}T${session.time}`)}</span>
            </div>
            <div className="schedule-duration">
              {session.duration} min
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleRacer;