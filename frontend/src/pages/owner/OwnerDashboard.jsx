import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const OwnerDashboard = () => {
  const { user } = useAuth();

  const [storeName, setStoreName] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/owner/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStoreName(res.data.storeName);
        setAvgRating(res.data.avgRating);
        setUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching owner dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "40px", fontSize: "18px" }}>
        Loading...
      </p>
    );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "24px",
          color: "#222",
        }}
      >
        Welcome, {user?.name || "Owner"} 👋
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Store Info */}
        <div
          style={{
            padding: "16px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "6px" }}>
            {storeName}
          </h2>
          <p style={{ color: "#555", fontSize: "16px" }}>
            Average Rating:{" "}
            <span style={{ fontWeight: "bold", color: "#000" }}>
              {avgRating.toFixed(1)}
            </span>
          </p>
        </div>

        {/* Users who rated */}
        <div
          style={{
            padding: "16px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "#222",
            }}
          >
            Users Who Rated {storeName}
          </h2>
          {users.length === 0 ? (
            <p style={{ color: "#666", fontSize: "15px" }}>
              No ratings submitted yet.
            </p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {users.map((u) => (
                <li
                  key={u.id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    marginBottom: "8px",
                    fontSize: "15px",
                    background: "#f9f9f9",
                  }}
                >
                  {u.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
