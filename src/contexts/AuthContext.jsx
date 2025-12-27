import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // This logs if the provider is missing in the tree
    console.error('❌ AuthContext not found. Ensure your component is wrapped in <AuthProvider>.');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeToken = (token) => {
    if (!token || typeof token !== 'string' || !token.includes('.')) {
      return null;
    }
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("❌ Token decode error:", e);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('user_id');
    
    if (token) {
      const decoded = decodeToken(token);
      console.log("🔓 Session Recovery - Decoded Token:", decoded);
      
      // Try to find the user ID in stored storage first, then fall back to token
      const userId = storedUserId || decoded?.user_id || decoded?.sub || decoded?.id;
      console.log("👤 Session Recovery - Found User ID:", userId);
      
      setUser({ token, user_id: userId });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await api.login(credentials);
    console.log("🔑 Login Response Data:", data);
    
    const decoded = decodeToken(data.access_token);
    
    // Search for user ID in multiple potential fields in the response AND the token
    const userId = data.user_id || data.id || data.user?.id || decoded?.user_id || decoded?.sub || decoded?.id;
    
    if (userId) {
       console.log("✅ Identity pinpointed:", userId);
       localStorage.setItem('user_id', userId);
    } else {
       console.warn("❔ No User ID found in login response or token payload.");
    }
    
    setUser({ token: data.access_token, user_id: userId });
    return data;
  };

  const register = async (credentials) => {
    return await api.register(credentials);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  console.log('🏗️ AuthProvider providing value:', value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
