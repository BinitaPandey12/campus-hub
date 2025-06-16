import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Reusing shared styles
import "./ClubAdmin.css";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FiUsers, FiPlusCircle, FiSettings } from "react-icons/fi";

const ClubAdmin = () => {
  const [users, setUsers] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="clubadmin-dashboard">
      <div className="clubadmin-header">
        <h1>Club Admin Dashboard</h1>
        <p>Manage your club users and events.</p>
      </div>

      <div className="clubadmin-actions">
        <button className="action-btn">
          <FiPlusCircle className="action-icon" />
          Add New Event
        </button>
        <button className="action-btn">
          <FiUsers className="action-icon" />
          View Club Users
        </button>
        <button className="action-btn">
          <FiSettings className="action-icon" />
          Settings
        </button>
      </div>

      <div className="clubadmin-users-section">
        <h2>Registered Users</h2>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="3">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClubAdmin;
