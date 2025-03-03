// src/constants/themes.ts
export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    placeholderColor: string;
  }
  
  export const themes: Record<string, Theme> = {
    midnight: {
      primaryColor: '#3498db',
      secondaryColor: '#2ecc71',
      backgroundColor: '#1a1f2b',
      textColor: '#e0e6ed',
      borderColor: '#34495e',
      placeholderColor: '#95a5a6',
    },
    forest: {
      primaryColor: '#27ae60',
      secondaryColor: '#f39c12',
      backgroundColor: '#1e2a1e',
      textColor: '#e0e6d4',
      borderColor: '#344d34',
      placeholderColor: '#8fa88f',
    },
    graphite: {
      primaryColor: '#3498db',
      secondaryColor: '#e74c3c',
      backgroundColor: '#2c2c2c',
      textColor: '#e0e0e0',
      borderColor: '#4a4a4a',
      placeholderColor: '#95a5a6',
    },
    ocean: {
      primaryColor: '#16a085',
      secondaryColor: '#3498db',
      backgroundColor: '#f0f4f7',
      textColor: '#2c3e50',
      borderColor: '#bdc3c7',
      placeholderColor: '#7f8c8d',
    },
    sunrise: {
      primaryColor: '#e67e22',
      secondaryColor: '#c0392b',
      backgroundColor: '#fdf6e3',
      textColor: '#4d3e2c',
      borderColor: '#d4c6a8',
      placeholderColor: '#8e7f6d',
    },
    ivory: {
      primaryColor: '#2ecc71',
      secondaryColor: '#f1c40f',
      backgroundColor: '#f5f5f5',
      textColor: '#333333',
      borderColor: '#cccccc',
      placeholderColor: '#7f8c8d',
    },
  };