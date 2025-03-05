import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'danger' | 'secondary';
  style?: object;
  textStyle?: object;
}

const Button: React.FC<ButtonProps> = ({ 
  onPress, 
  title, 
  variant = 'primary', 
  style,
  textStyle
}) => {
  const { currentTheme } = useContext(SettingsContext);
  
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return currentTheme.primaryColor;
      case 'danger':
        return '#e74c3c';
      case 'secondary':
        return currentTheme.secondaryColor;
      default:
        return currentTheme.primaryColor;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button, 
        { backgroundColor: getBackgroundColor() },
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Button; 