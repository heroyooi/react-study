import React, { useCallback, useState, useMemo, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toggleAuth = useCallback(() => {
    setIsAuthenticated(prevAuth => !prevAuth);
  }, []);
  const value = useMemo(() => ({
    isAuthenticated, toggleAuth
  }), [isAuthenticated])
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;