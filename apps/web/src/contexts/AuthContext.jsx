import React, { createContext, useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('nadeel_user');
    const storedToken = localStorage.getItem('nadeel_token');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({ ...parsed, token: storedToken || parsed.token });
      } catch (error) {
        localStorage.removeItem('nadeel_user');
        localStorage.removeItem('nadeel_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const result = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const loggedUser = { ...result.user, token: result.token };
      localStorage.setItem('nadeel_user', JSON.stringify(loggedUser));
      localStorage.setItem('nadeel_token', result.token);
      setUser(loggedUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const result = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      const registeredUser = { ...result.user, token: result.token };
      localStorage.setItem('nadeel_user', JSON.stringify(registeredUser));
      localStorage.setItem('nadeel_token', result.token);
      setUser(registeredUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('nadeel_user');
    localStorage.removeItem('nadeel_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};