import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

interface TypographyProps {
  children: React.ReactNode;
  style?: object;
}

export const Title: React.FC<TypographyProps> = ({ children, style }) => {
  const { currentTheme } = useContext(SettingsContext);
  
  return (
    <Text style={[styles.title, { color: currentTheme.textColor }, style]}>
      {children}
    </Text>
  );
};

export const Subtitle: React.FC<TypographyProps> = ({ children, style }) => {
  const { currentTheme } = useContext(SettingsContext);
  
  return (
    <Text style={[styles.subtitle, { color: currentTheme.textColor }, style]}>
      {children}
    </Text>
  );
};

export const BodyText: React.FC<TypographyProps & { secondary?: boolean }> = ({ 
  children, 
  style,
  secondary = false 
}) => {
  const { currentTheme } = useContext(SettingsContext);
  
  // Ensure high contrast by using textColor instead of placeholderColor for secondary text
  const textColor = secondary 
    ? (currentTheme.backgroundColor.includes('#1') ? '#ffffff' : '#333333') 
    : currentTheme.textColor;
  
  return (
    <Text style={[styles.body, { color: textColor }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    marginBottom: 8,
  },
}); 