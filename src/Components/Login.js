import React, { useState } from "react";
import logo from "../Mobilis Inventory Manager.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginStatus(""); // Clear previous login status message

    // Send a login request to the server
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          window.location.href = "/Home";
          setLoginStatus("Connecté");
        } else {
          setLoginStatus("Identifiant ou mot de passe incorrect");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginStatus("Une erreur s'est produite lors de la connexion");
      });
  };

  return (
    <div className="App">
      <nav>
        <img className="logo" src={logo} alt="logo" />
      </nav>

      <div className="login-card">
        <h2>Connectez-vous</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Identifiant:</label>
          <div className="area id">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="ex@alger.dz"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="password">Mot de passe:</label>
          <div className="area mpd">
            <input
              type="password"
              id="password"
              value={password}
              placeholder="exemple123"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {loginStatus && <p className="login-status">{loginStatus}</p>}

          <button className="login-btn" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
