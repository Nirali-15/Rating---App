import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (name) params.name = name;
      if (email) params.email = email;
      if (address) params.address = address;
      if (role) params.role = role;

      const res = await api.get("/admin/users", { params });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  if (loading)
    return (
      <div style={{ padding: "20px", fontSize: "18px", color: "#555" }}>
        Loading users...
      </div>
    );

  // Common Styles
  const containerStyle = {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "#f9fafb",
    minHeight: "100vh"
  };

  const titleStyle = {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#2c3e50"
  };

  const filterBarStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "12px",
    background: "#fff",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
    marginBottom: "24px"
  };

  const inputStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px"
  };

  const buttonStyle = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.2s"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.05)"
  };

  const thStyle = {
    padding: "12px",
    borderBottom: "2px solid #e0e0e0",
    background: "#f8f9fa",
    fontWeight: "600",
    textAlign: "left",
    color: "#444"
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #e0e0e0",
    color: "#555",
    fontSize: "14px"
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Manage Users</h1>

      {/* Filter Bar */}
      <form onSubmit={handleFilter} style={filterBarStyle}>
        <input
          type="text"
          placeholder="Name"
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          style={inputStyle}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <select
          style={inputStyle}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="Owner">Owner</option>
        </select>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.background = "#2563eb")}
        >
          Filter
        </button>
      </form>

      {/* Users Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Ratings</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr
              key={u.id}
              style={{
                background: idx % 2 === 0 ? "#ffffff" : "#fafafa"
              }}
            >
              <td style={tdStyle}>{u.name}</td>
              <td style={tdStyle}>{u.email}</td>
              <td style={tdStyle}>{u.address}</td>
              <td style={tdStyle}>{u.role}</td>
              <td style={tdStyle}>
                {u.storeRatings
                  ? `Total: ${u.storeRatings.totalRatings}, Avg: ${u.storeRatings.averageScore}`
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
