import React, { useEffect, useState } from "react";
import api from "../../api/api";

const StoresList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/stores");
      setStores(res.data);
    } catch (err) {
      console.error("Error fetching stores", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) return <div style={{ padding: "20px", fontSize: "18px" }}>Loading stores...</div>;
  if (!stores.length) return <p style={{ padding: "20px", fontSize: "18px" }}>No stores found.</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
        Stores List
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        <thead>
          <tr style={{ background: "#f4f6f8", textAlign: "left" }}>
            <th style={{ padding: "12px", borderBottom: "2px solid #e0e0e0" }}>ID</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #e0e0e0" }}>Name</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #e0e0e0" }}>Email</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #e0e0e0" }}>Address</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #e0e0e0" }}>Owner</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #e0e0e0" }}>Ratings</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s, index) => (
            <tr
              key={s.id}
              style={{
                background: index % 2 === 0 ? "#ffffff" : "#fafafa",
                transition: "background 0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f7ff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = index % 2 === 0 ? "#ffffff" : "#fafafa")
              }
            >
              <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0" }}>{s.id}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0" }}>{s.name}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", color: "#2980b9" }}>
                {s.email}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0" }}>{s.address}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0" }}>{s.ownerName}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", fontWeight: "bold" }}>
                ⭐ {s.ratingsCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoresList;
