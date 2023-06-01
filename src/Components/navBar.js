import React, { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import logo from "../Mobilis Inventory Manager.png";
import userImg from "../image.webp";

function NavBar() {
  
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [userName, setUserName] = useState("");
  
    useEffect(() => {
      // Fetch the user role and name from the server
      axios
        .get("http://localhost:8000/api/user-details", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response)
          setUserRole(response.data.role);
          setUserName(response.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("token"); // Remove the token from localStorage
      window.location.href = "/"; // Navigate to the login page
    };
  
    const openLogoutModal = () => {
      setShowLogoutModal(true);
    };
  
    const closeLogoutModal = () => {
      setShowLogoutModal(false);
    };
  

const GoHome =()=>{
    window.location.href = "/";
}

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img className="logo" src={logo} onClick={GoHome} alt="" />
      </div>
      <div className="navbar-menu">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/historique" className="nav-link">
              Historique
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={openLogoutModal}>
              Se déconnecter
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-account">
        <div className="account-section">
          <img className="account-img" src={userImg} alt="" />
          <h4>{userName}</h4>
          <div className="account-dropdown">
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <Link to="/historique" className="dropdown-link">
                 Historique
                </Link>
              </li>
              {userRole === "admin" && (
  <li className="dropdown-item">
    <Link to="/Gestion-utilisateur" className="dropdown-link">
      Gestion d'utilisateur
    </Link>
  </li>
)}
              <li className="dropdown-item">
                <button className="dropdown-link" onClick={openLogoutModal}>
                  Se déconnecter
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h2>Confirmation de déconnexion</h2>
            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="logout-modal-buttons">
              <button onClick={handleLogout}>Confirmer</button>
              <button onClick={closeLogoutModal}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
