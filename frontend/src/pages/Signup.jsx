import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Validation helpers
  const validate = () => {
    if (name.length < 20 || name.length > 60)
      throw new Error("Name must be between 20 and 60 characters");
    if (address.length > 400)
      throw new Error("Address cannot exceed 400 characters");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Invalid email format");
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passwordRegex.test(password))
      throw new Error(
        "Password must be 8-16 chars, include an uppercase letter & a special character"
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      validate();
      await signup({ name, email, address, password });
      setSuccess("Account created! Please login.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Signup failed";
      setError(msg);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f6fa", // soft gray background
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
          width: "380px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#222",
            marginBottom: "10px",
          }}
        >
          Create Account
        </h2>

        {error && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "6px",
            }}
          >
            {error}
          </p>
        )}
        {success && (
          <p
            style={{
              color: "green",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "6px",
            }}
          >
            {success}
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <textarea
          placeholder="Address"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            outline: "none",
            resize: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "#fff",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          Signup
        </button>

        <p
          style={{
            fontSize: "14px",
            textAlign: "center",
            marginTop: "8px",
            color: "#555",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2563eb", fontWeight: "500" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
