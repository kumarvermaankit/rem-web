import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiGet, apiPost, setToken, clearToken } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState(null);

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem('ping_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }
    try {
      const data = await apiGet('/auth/me');
      if (data.success) {
        setUser(data.user);
        return data.user;
      }
      clearToken();
      setUser(null);
      return null;
    } catch {
      clearToken();
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  const login = async (email, password) => {
    const data = await apiPost('/auth/login', { email, password });
    if (data.success) {
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (name, email, password, phone) => {
    const data = await apiPost('/auth/register', { name, email, password, phone });
    if (data.success) {
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const openAuth = (mode = 'login', onSuccess = null) => setAuthModal({ mode, onSuccess });
  const closeAuth = () => setAuthModal(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, fetchMe, authModal, openAuth, closeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
