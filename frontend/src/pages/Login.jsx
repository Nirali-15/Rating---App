import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // simple validation
  const validate = () => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";

    if (!password) return "Password is required";
    if (password.length < 8 || password.length > 16)
      return "Password must be 8-16 characters";
    if (!/[A-Z]/.test(password))
      return "Password must include at least one uppercase letter";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
      return "Password must include at least one special character";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      if (user?.role === "ADMIN") navigate("/admin");
      else if (user?.role === "OWNER") navigate("/owner");
      else navigate("/user");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f6fa", // same as Signup.jsx
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
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
          Welcome Back 👋
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

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
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
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              backgroundColor: loading ? "#93c5fd" : "#2563eb",
              color: "#fff",
              boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              transition: "0.2s",
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = "#1d4ed8";
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = "#2563eb";
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          style={{
            fontSize: "14px",
            textAlign: "center",
            marginTop: "8px",
            color: "#555",
          }}
        >
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#2563eb", fontWeight: "500" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
