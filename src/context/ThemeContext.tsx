import React, { createContext, useContext } from 'react';
import { SettingsContext } from './SettingsContext';

// Explicitly re-export the Theme type for components to use
export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  placeholderColor: string;
}

// Create a separate context for the theme
export const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTheme } = useContext(SettingsContext);
  
  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easier access to the theme
export const useTheme = () => {
  const theme = useContext(ThemeContext);
  
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return theme;
}; 