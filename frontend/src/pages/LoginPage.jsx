import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { login } from "../services/userServices";
import JSEncrypt from "jsencrypt";

const LoginPage = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = ({ isGoogle }) => {
    const user = {
      email,
      password,
    };

    if ((!email || !password) && !isGoogle) {
      alert("Please fill in Email and Password");
      return;
    }

    login({ user, isGoogle }).then((response) => {
      if (response.status === 200) {
        alert("Login successful", clearTimeout(1000));
        navigate("/");
      } else {
        console.log("error", response);
        alert(response.message);
      }
    });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "30%",
          background: "rgba(51, 51, 51, 0.8)", // Glassmorphism effect
          backdropFilter: "blur(10px)",
          padding: "2rem",
          borderRadius: "0.75rem",
          color: "#fff",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Sign In</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              marginBottom: "0.5rem",
              fontSize: "1rem",
              display: "block",
              color: "#bbb",
            }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              border: "none",
              backgroundColor: "#222",
              color: "#fff",
              outline: "none",
              transition: "0.3s",
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              marginBottom: "0.5rem",
              fontSize: "1rem",
              display: "block",
              color: "#bbb",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              border: "none",
              backgroundColor: "#222",
              color: "#fff",
              outline: "none",
              transition: "0.3s",
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
            width: "100%",
            transition: "0.3s",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          onClick={() => handleLogin({ isGoogle: false })}
        >
          Login
        </button>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p style={{ color: "#bbb", marginBottom: "0.5rem" }}>Or</p>
          <button
            style={{
              backgroundColor: "#dd4b39",
              color: "#fff",
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              width: "100%",
              transition: "0.3s",
              fontWeight: "bold",
              boxShadow: "0 4px 8px rgba(221, 75, 57, 0.2)",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b52e1f")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#dd4b39")}
            onClick={() => handleLogin({ isGoogle: true })}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
