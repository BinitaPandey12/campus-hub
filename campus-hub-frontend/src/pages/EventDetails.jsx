import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./EventDetails.css";
import {
  FiCalendar,
  FiMapPin,
  FiEdit2,
  FiTrash2,
  FiLogIn,
} from "react-icons/fi";

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setEvent({
      id: eventId,
      title: "AI Workshop",
      description:
        "Learn about AI and ML basics in this comprehensive workshop designed for beginners. Our expert instructors will guide you through hands-on exercises and real-world applications.",
      date: "2025-06-05",
      location: "Main Hall, Campus Building A",
    });

    const currentUser = auth.currentUser;
    if (currentUser?.email === "clubadmin@campus.com") {
      setUserRole("admin");
    } else {
      setUserRole("student");
    }
  }, [eventId]);

  const handleEnroll = () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to enroll.");
      navigate("/login");
      return;
    }
    alert("Enrollment successful!");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      alert("Event deleted");
    }
  };

  const handleUpdate = () => {
    navigate(`/events/${eventId}/edit`);
  };

  if (!event) return <div className="loading-state">Loading event details...</div>;

  return (
    <div className="event-details-container">
      <div className="event-card">
        <div className="event-hero">
          <div className="event-hero-content">
            <span className="event-badge">Event ID: {event.id}</span>
            <h1 className="event-title">{event.title}</h1>
            <p className="event-subtitle">Organized by Campus Hub</p>
          </div>
        </div>

        <div className="event-content">
          <div className="event-header">
            <h1 className="event-title">{event.title}</h1>
          </div>

          <p className="event-description">{event.description}</p>

          <div className="event-meta">
            <span className="meta-item">
              <FiCalendar className="btn-icon" />
              {event.date}
            </span>
            <span className="meta-item">
              <FiMapPin className="btn-icon" />
              {event.location}
            </span>
          </div>

          <div className="action-buttons">
            {userRole === "admin" && (
              <>
                <button className="btn btn-edit" onClick={handleUpdate}>
                  <FiEdit2 className="btn-icon" />
                  Edit Event
                </button>
                <button className="btn btn-delete" onClick={handleDelete}>
                  <FiTrash2 className="btn-icon" />
                  Delete Event
                </button>
              </>
            )}

            {userRole === "student" && (
              <button className="btn btn-enroll" onClick={handleEnroll}>
                <FiLogIn className="btn-icon" />
                Enroll in Event
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
