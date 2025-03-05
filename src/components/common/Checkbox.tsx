import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { BodyText } from './Typography';

interface CheckboxProps {
  checked: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  style?: object;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  onValueChange, 
  label, 
  style 
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      {label && (
        <BodyText style={styles.label}>{label}</BodyText>
      )}
      <TouchableOpacity
        style={[
          styles.checkbox,
          {
            backgroundColor: checked ? theme.primaryColor : 'transparent',
            borderColor: theme.borderColor,
          },
        ]}
        onPress={() => onValueChange(!checked)}
        activeOpacity={0.7}
      >
        {checked && <MaterialCommunityIcons name="check" size={18} color="#fff" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginRight: 8,
  },
});

export default Checkbox; 