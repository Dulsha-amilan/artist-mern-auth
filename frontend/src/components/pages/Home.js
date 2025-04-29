import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to MERN Authentication System</h1>
        <p>
          This is a full-stack application built with the MERN stack
          (MongoDB, Express, React, Node.js) that provides user authentication
          functionality.
        </p>
        
        {!currentUser ? (
          <div className="home-buttons">
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        ) : (
          <div className="home-buttons">
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;