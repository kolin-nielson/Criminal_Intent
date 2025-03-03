import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Theme } from '../constants/themes';

interface ThemeItemProps {
  label: string;
  value: string;
  isSelected: boolean;
  onPress: () => void;
  theme: Theme;
}

const ThemeItem: React.FC<ThemeItemProps> = ({ label, value, isSelected, onPress, theme }) => (
  <TouchableOpacity
    style={[
      styles.themeItem,
      {
        backgroundColor: theme.secondaryColor,
        borderColor: isSelected ? theme.primaryColor : theme.borderColor,
      },
    ]}
    onPress={onPress}
  >
    <Text style={[styles.themeText, { color: theme.textColor }]}>{label}</Text>
    {isSelected && (
      <Text style={[styles.checkmark, { color: theme.primaryColor }]}>✓</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  themeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  themeText: { fontSize: 16 },
  checkmark: { fontSize: 16, fontWeight: 'bold' },
});

export default ThemeItem;