import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('doctormap_user');
    const savedToken = localStorage.getItem('doctormap_token');
    const savedIsDemo = localStorage.getItem('doctormap_is_demo');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }

    if (savedIsDemo) {
      setIsDemo(JSON.parse(savedIsDemo));
    }

    const savedDarkMode = localStorage.getItem('doctormap_darkmode');
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const register = async (userData) => {
    try {
      let response;
      
      // Use different endpoints based on role
      if (userData.role === 'patient') {
        response = await api.post('/api/patients/register', userData);
      } else {
        response = await api.post('/api/users/register', userData);
      }
      
      const { token, ...user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('doctormap_token', token);
      
      setUser(user);
      localStorage.setItem('doctormap_user', JSON.stringify(user));
      
      // Set token in api header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Registration failed';
      throw new Error(message);
    }
  };

  const login = async ({ email, password, role }) => {
    try {
      let response;
      
      // Use different endpoints based on role
      if (role === 'patient') {
        response = await api.post('/api/patients/login', { email, password });
      } else {
        response = await api.post('/api/users/login', { email, password });
      }
      
      const { token, ...user } = response.data;
      
      // Check if role matches
      if (user.role !== role) {
        throw new Error('Invalid credentials for this role');
      }
      
      // Check if this is a demo account
      const isDemoAccount = email === 'demo@patient.com' || email === 'demo@doctor.com';
      setIsDemo(isDemoAccount);
      localStorage.setItem('doctormap_is_demo', JSON.stringify(isDemoAccount));
      
      // Store token in localStorage
      localStorage.setItem('doctormap_token', token);
      
      setUser(user);
      localStorage.setItem('doctormap_user', JSON.stringify(user));
      
      // Set token in api header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    setIsDemo(false);
    localStorage.removeItem('doctormap_user');
    localStorage.removeItem('doctormap_token');
    localStorage.removeItem('doctormap_is_demo');
    delete api.defaults.headers.common['Authorization'];
  };

  const toggleDarkMode = () => {
    const mode = !darkMode;
    setDarkMode(mode);
    localStorage.setItem('doctormap_darkmode', JSON.stringify(mode));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        darkMode,
        toggleDarkMode,
        isAuthenticated: !!user,
        isDoctor: user?.role === 'doctor',
        isPatient: user?.role === 'patient',
        isDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};