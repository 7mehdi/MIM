import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Home';
import Historique from "./Components/Histoique";
import GestionUsers from './Components/GestionUsers';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token'); // Get the token from localStorage or other storage mechanism
  
    fetch('http://localhost:8000/api/check-session', {
      headers: {
        Authorization: token, // Include the token in the request headers
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/Home" /> : <Login />}
          />
          <Route
            path="/Home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
           <Route
            path="/historique"
            element={isLoggedIn ? <Historique/>: <Navigate to="/" />}
          />
          <Route
            path="/gestion-utilisateur"
            element={isLoggedIn ? <GestionUsers/>: <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
