import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  placeholderColor: string;
}

interface SettingsContextValue {
  theme: string;
  currentTheme: Theme;
  saveTheme: (newTheme: string) => Promise<void>;
}

const themes: Record<string, Theme> = {
  purple: {
    primaryColor: '#8e44ad',
    secondaryColor: '#3498db',
    backgroundColor: '#2c1b3d',
    textColor: '#e0d8e9',
    borderColor: '#5e2e7d',
    placeholderColor: '#a68bb8',
  },
  teal: {
    primaryColor: '#16a085',
    secondaryColor: '#2ecc71',
    backgroundColor: '#f0f7f6',
    textColor: '#2d6f62',
    borderColor: '#88b8ae',
    placeholderColor: '#77a69c',
  },
  emerald: {
    primaryColor: '#2ecc71',
    secondaryColor: '#27ae60',
    backgroundColor: '#e8f5e9',
    textColor: '#1a5c38',
    borderColor: '#8bc34a',
    placeholderColor: '#6ea959',
  },
  crimson: {
    primaryColor: '#c0392b',
    secondaryColor: '#e74c3c',
    backgroundColor: '#3d1a16',
    textColor: '#f2c6c2',
    borderColor: '#7a2e27',
    placeholderColor: '#b58a84',
  },
  indigo: {
    primaryColor: '#2980b9',
    secondaryColor: '#8e44ad',
    backgroundColor: '#1e2a44',
    textColor: '#d1e0eb',
    borderColor: '#4a688e',
    placeholderColor: '#8ba3c1',
  },
  gold: {
    primaryColor: '#d4a017',
    secondaryColor: '#f1c40f',
    backgroundColor: '#fff8e1',
    textColor: '#6d5209',
    borderColor: '#e6bf5e',
    placeholderColor: '#b38e3f',
  },
};

export const SettingsContext = createContext<SettingsContextValue>({
  theme: 'purple',
  currentTheme: themes.purple,
  saveTheme: async () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('purple');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme && themes[savedTheme]) setTheme(savedTheme);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  const saveTheme = async (newTheme: string) => {
    try {
      if (themes[newTheme]) {
        await AsyncStorage.setItem('theme', newTheme);
        setTheme(newTheme);
      }
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const currentTheme = themes[theme] || themes.purple;

  return (
    <SettingsContext.Provider
      value={{
        theme,
        currentTheme,
        saveTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};