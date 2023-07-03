import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Home';
import Historique from "./Components/Histoique";
import GestionUsers from './Components/GestionUsers';
import Dashboard from "./Components/Dashboard";



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

  // Save the login state in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Retrieve the login state from local storage on initial load
  useEffect(() => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (storedIsLoggedIn !== null) {
      setIsLoggedIn(storedIsLoggedIn);
    }
  }, []);
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        // Page is being restored from the bfcache
        // Handle specific logic here
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/historique" /> : <Login />}
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
           <Route
            path="/Dashboard"
            element={isLoggedIn ? <Dashboard/>: <Navigate to="/" />}
          />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
