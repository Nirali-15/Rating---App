// src/pages/admin/UserDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/admin/users/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (loading)
    return <div style={{ padding: "20px", color: "#555", fontSize: "18px" }}>Loading user details...</div>;
  if (!user)
    return <div style={{ padding: "20px", color: "#e74c3c", fontSize: "18px" }}>User not found</div>;

  const cardStyle = {
    background: "#fff",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "24px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "8px",
    overflow: "hidden"
  };

  const thStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #e0e0e0",
    background: "#f8f9fa",
    color: "#444",
    fontWeight: "600"
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #e0e0e0",
    color: "#555"
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto", background: "#f9fafb", minHeight: "100vh" }}>
      {/* Back Link */}
      <Link to="/admin/users" style={{ color: "#1d4ed8", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
        ← Back to Users
      </Link>

      {/* Page Title */}
      <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#2c3e50", margin: "16px 0" }}>
        User Details
      </h1>

      {/* User Info */}
      <div style={cardStyle}>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* Stores */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px", color: "#2c3e50" }}>
          Stores Owned
        </h2>
        {user.stores?.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Address</th>
              </tr>
            </thead>
            <tbody>
              {user.stores.map((s, idx) => (
                <tr
                  key={s.id}
                  style={{ background: idx % 2 === 0 ? "#ffffff" : "#fdfdfd" }}
                >
                  <td style={tdStyle}>{s.id}</td>
                  <td style={tdStyle}>{s.name}</td>
                  <td style={tdStyle}>{s.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "#777" }}>No stores owned</p>
        )}
      </div>

      {/* Ratings */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px", color: "#2c3e50" }}>
          Ratings Submitted
        </h2>
        {user.ratings?.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Score</th>
                <th style={thStyle}>Comment</th>
              </tr>
            </thead>
            <tbody>
              {user.ratings.map((r, idx) => (
                <tr
                  key={r.id}
                  style={{ background: idx % 2 === 0 ? "#ffffff" : "#fdfdfd" }}
                >
                  <td style={tdStyle}>{r.id}</td>
                  <td style={{ ...tdStyle, fontWeight: "600", color: "#f39c12" }}>⭐ {r.score}</td>
                  <td style={tdStyle}>{r.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "#777" }}>No ratings submitted</p>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
