import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-welcome">
        <h2>Welcome {currentUser?.name}</h2>
        <p>You have successfully logged in to the MERN Auth system.</p>
      </div>
      <div className="dashboard-info">
        <div className="info-card">
          <h3>User Information</h3>
          <p><strong>Name:</strong> {currentUser?.name}</p>
          <p><strong>Email:</strong> {currentUser?.email}</p>
          <p><strong>User ID:</strong> {currentUser?.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;