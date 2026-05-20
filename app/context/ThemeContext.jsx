"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setDarkMode(saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const theme = {
    darkMode,
    toggleTheme,
    bg: darkMode ? 'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)' : 'linear-gradient(135deg,#f8f6f0 0%,#faf8f3 50%,#f5f3ee 100%)',
    color: darkMode ? 'white' : '#1a1a1a',
    cardBg: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)',
    cardBorder: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    sidebarBg: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)',
    sidebarBorder: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    textMuted: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
    textSecondary: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
    inputBg: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    inputBorder: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    navBg: darkMode ? 'rgba(10,10,24,0.95)' : 'rgba(255,255,255,0.95)',
    navBorder: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    gold: '#d4af37',
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);