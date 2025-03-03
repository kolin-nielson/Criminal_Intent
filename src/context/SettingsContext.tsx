import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, themes } from '../constants/themes';
import { View, Text } from 'react-native';

interface SettingsContextValue {
  theme: string;
  currentTheme: Theme;
  saveTheme: (newTheme: string) => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextValue>({
  theme: 'midnight',
  currentTheme: themes.midnight,
  saveTheme: async () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string | null>(null); // Start with null to indicate loading

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        setTheme(savedTheme && themes[savedTheme] ? savedTheme : 'midnight');
      } catch (error) {
        console.error('Error loading settings:', error);
        setTheme('midnight'); // Fallback on error
      }
    };
    loadSettings();
  }, []);

  // Render a loading state until the theme is loaded
  if (theme === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading theme...</Text>
      </View>
    );
  }

  const currentTheme = themes[theme]; // Guaranteed to be defined after loading

  const saveTheme = async (newTheme: string) => {
    if (!themes[newTheme]) {
      console.warn(`Theme ${newTheme} not found, skipping update`);
      return;
    }
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setTheme(newTheme); // Update state to trigger rerender
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ theme, currentTheme, saveTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};