import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LogIn.css"

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Email and password are required");
    return;
  }

  try {
    const response = await fetch("http://localhost/doctor_app/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Login failed");
      return;
    }

    if (data.name === "Admin") {
      localStorage.setItem("userEmailAdmin", email);
      localStorage.setItem("userNameAdmin", data.name);
      navigate("/admin-dashboard");
    } else if (data.name === "Doctor") {
      localStorage.setItem("userEmailDoctor", email);
      localStorage.setItem("userNameDoctor", data.name);
      navigate("/doctor_dashboard");
    } else if (data.name === "Patient") {
      localStorage.setItem("userEmailPatient", email);
      localStorage.setItem("userNamePatient", data.name);
      navigate("/patient_dashboard");
    } else if (data.name === "Anıl") {
      localStorage.setItem("userEmailPatient", email);
      localStorage.setItem("userNamePatient", data.name);
      navigate("/patient_dashboard");
    } else if (data.name === "Ece") {
      localStorage.setItem("userEmailPatient", email);
      localStorage.setItem("userNamePatient", data.name);
      navigate("/patient_dashboard");
    } else if (data.name === "Timur") {
      localStorage.setItem("userEmailPatient", email);
      localStorage.setItem("userNamePatient", data.name);
      navigate("/patient_dashboard");
    } else if (data.name === "Cengiz") {
      localStorage.setItem("userEmailDoctor", email);
      localStorage.setItem("userNameDoctor", data.name);
      navigate("/doctor_dashboard");
    } else if (data.name === "Songül") {
      localStorage.setItem("userEmailDoctor", email);
      localStorage.setItem("userNameDoctor", data.name);
      navigate("/doctor_dashboard");
    } else {
      setError("Unknown name");
    }

  } catch (err) {
    console.error("Fetch error:", err);
    setError("Network error");
  }
};

  return (
    <div className="log_body">
      <div className="log_div">
        <h2 className="log_h">Welcome Back!</h2>
        <p className="log_p">Login with details to continue</p>

        <form onSubmit={handleLogin}>
          <label className="log_input_p">Email:</label>
          <input
            className="log_input"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="log_input_p">Password:</label>
          <input
            className="log_input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="log_a_button" type="submit">Log In</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="log_p">
          Don't have an account? <Link to={"/register"} className="log_link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;