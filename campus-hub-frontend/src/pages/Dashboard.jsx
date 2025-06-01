import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

// Sample data structure
const clubsData = [
  {
    id: 1,
    name: "Nepal Tek Community",
    description: "For technology enthusiasts",
    events: [
      { id: 1, name: "Hackathon 2023", date: "May 15-17", status: "upcoming" },
      { id: 2, name: "AI Workshop", date: "June 1", status: "upcoming" }
    ]
  },
  {
    id: 2,
    name: "NOSK",
    description: "All about sports and fitness",
    events: [
      { id: 3, name: "Annual Sports Day", date: "Ongoing", status: "running" },
      { id: 4, name: "Basketball Tournament", date: "May 20", status: "upcoming" }
    ]
  },
  {
    id: 3,
    name: "IEEE Computer Society",
    description: "Creative arts and performances",
    events: [
      { id: 5, name: "Art Exhibition", date: "May 10-12", status: "running" },
      { id: 6, name: "Drama Night", date: "June 5", status: "upcoming" }
    ]
  }
];

const Dashboard = () => (
  <div className="dashboard-container">
    {/* Header/Navbar */}
    <header className="dashboard-header">
      <h1 className="dashboard-logo">Campus Hub</h1>
      <nav className="dashboard-nav">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/profile" className="nav-link profile-link">
            <span role="img" aria-label="User Profile" className="profile-icon">👤</span>
        </Link>
      </nav>
    </header>

    {/* Main Content */}
    <main className="dashboard-main">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Campus Clubs & Events</h2>
        
        <div className="clubs-container">
          {clubsData.map(club => (
            <div key={club.id} className="club-card">
              <div className="club-header">
                <h3 className="club-name">{club.name}</h3>
                <p className="club-description">{club.description}</p>
              </div>
              
              <div className="club-events">
                <h4 className="events-title">Club Events:</h4>
                <ul className="events-list">
                  {club.events.map(event => (
                    <li key={event.id} className={`event-item ${event.status}`}>
                      <Link to={`/event/${event.id}`} className="event-link">
                        {event.status === 'running' && (
                          <span className="event-badge highlight">Live</span>
                        )}
                        <span className="event-text">{event.name}</span>
                        <span className="event-date">{event.date}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

export default Dashboard;