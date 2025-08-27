// src/pages/Stores.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(""); // 🔹 Search filter

  const token = localStorage.getItem("token");

  // 🔹 Fetch stores from backend
  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setStores(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stores:", error);
      setLoading(false);
    }
  };

  // 🔹 Handle rating submission
  const handleRating = async (storeId, score) => {
    try {
      await axios.post(
        "http://localhost:5000/api/ratings",
        { storeId, score },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Refresh from backend to get updated average + user rating
      fetchStores();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // 🔹 Filtered stores based on name or address
  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(filter.toLowerCase()) ||
      (store.address &&
        store.address.toLowerCase().includes(filter.toLowerCase()))
  );

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "40px", fontSize: "18px" }}>
        Loading stores...
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
          fontSize: "26px",
          fontWeight: "bold",
          marginBottom: "24px",
          color: "#222",
          textAlign: "center",
        }}
      >
        Store Listings
      </h1>

      {/* 🔹 Filter Bar */}
      <input
        type="text"
        placeholder="Search by store name or address..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          width: "100%",
          border: "1px solid #ccc",
          padding: "10px 14px",
          borderRadius: "8px",
          marginBottom: "20px",
          fontSize: "15px",
          outline: "none",
        }}
      />

      {filteredStores.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No stores found</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredStores.map((store) => (
            <div
              key={store.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                background: "#fff",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                {store.name}
              </h2>
              <p style={{ color: "#666", marginBottom: "8px" }}>
                {store.address || "No address provided"}
              </p>

              <p style={{ margin: "6px 0", fontSize: "15px" }}>
                <span style={{ fontWeight: "500" }}>Overall Rating:</span>{" "}
                {store.overallRating
                  ? store.overallRating.toFixed(1)
                  : "No ratings yet"}
              </p>

              <p style={{ margin: "6px 0", fontSize: "15px" }}>
                <span style={{ fontWeight: "500" }}>Your Rating:</span>{" "}
                {store.userRating ? store.userRating : "Not rated yet"}
              </p>

              {/* Rating Stars */}
              <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(store.id, star)}
                    style={{
                      fontSize: "22px",
                      cursor: "pointer",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    {star <= (store.userRating || 0) ? "⭐" : "☆"}
                  </button>
                ))}
              </div>

              {/* Show owner */}
              {store.owner && (
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                    color: "#888",
                  }}
                >
                  Owner: {store.owner.name}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stores;
