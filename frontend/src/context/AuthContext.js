import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Set axios default headers
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const API_URL = 'http://localhost:5000/api/auth';

  // Register user
  const register = async (userData) => {
    try {
      setError('');
      const response = await axios.post(`${API_URL}/register`, userData);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setCurrentUser(response.data.user);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      throw err;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      setError('');
      const response = await axios.post(`${API_URL}/login`, userData);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setCurrentUser(response.data.user);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Load user
  const loadUser = async () => {
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/me`);
        
        if (response.data.success) {
          setCurrentUser(response.data.data);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setToken(null);
        setCurrentUser(null);
        delete axios.defaults.headers.common['Authorization'];
      }
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const value = {
    currentUser,
    token,
    loading,
    error,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};