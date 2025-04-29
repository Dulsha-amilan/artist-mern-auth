import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </li>
      <li className="nav-item">
        <a 
          href="#!" 
          className="nav-link" 
          onClick={onLogout}
        >
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/register" className="nav-link">Register</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">MERN Auth</Link>
        <div className="navbar-menu">
          {currentUser ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;