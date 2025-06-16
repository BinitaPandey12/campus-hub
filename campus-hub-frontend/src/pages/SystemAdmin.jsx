// src/pages/SystemAdmin.jsx

import React, { useEffect, useState } from "react";
import "./SystemAdmin.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function SystemAdmin() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from backend (mocked here)
    setAdmins([
      { id: 1, name: "Admin One", email: "club1@campus.com" },
      { id: 2, name: "Admin Two", email: "club2@campus.com" },
    ]);

    setUsers([
      { id: 1, name: "Student A", email: "studA@campus.com" },
      { id: 2, name: "Student B", email: "studB@campus.com" },
    ]);
  }, []);

  const handleAddAdmin = () => {
    alert("Redirect to add new club admin");
    // navigate("/add-club-admin"); // If you have an AddAdmin form
  };

  const handleDelete = (type, id) => {
    const item = type === "admin" ? "Club Admin" : "User";
    if (window.confirm(`Are you sure you want to delete this ${item}?`)) {
      alert(`${item} with ID ${id} deleted`);
      // Call backend delete API here
    }
  };

  return (
    <div className="system-admin-container">
      <h1 className="dashboard-title">System Admin Dashboard</h1>

      <section className="admin-section">
        <div className="section-header">
          <h2>Club Admins</h2>
          <button className="btn btn-add" onClick={handleAddAdmin}>
            + Add Club Admin
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete("admin", admin.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="admin-section">
        <h2>Registered Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete("user", user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default SystemAdmin;
