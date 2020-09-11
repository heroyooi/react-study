import React, { useState, useCallback, createContext, useMemo } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const state = useMemo(() => ({
    isLightTheme,
    light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
    dark: { syntax: '#ddd', ui: '#333', bg: '#555' }
  }), [isLightTheme]);
  const toggleTheme = useCallback(() => {
    setIsLightTheme(prevTheme => !prevTheme);
  }, []);
    
  return (
    <ThemeContext.Provider value={{...state, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;