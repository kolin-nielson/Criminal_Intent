import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from '../constants/themes';

interface SolvedCheckboxProps {
  solved: boolean;
  setSolved: (solved: boolean) => void;
  theme: Theme;
}

const SolvedCheckbox: React.FC<SolvedCheckboxProps> = ({ solved, setSolved, theme }) => (
  <View style={styles.checkboxContainer}>
    <TouchableOpacity
      onPress={() => setSolved(!solved)}
      style={[
        styles.checkbox,
        { borderColor: theme.textColor },
        solved && { backgroundColor: theme.primaryColor, borderColor: theme.primaryColor },
      ]}
    >
      {solved && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
    <Text style={[styles.checkboxLabel, { color: theme.textColor }]}>Solved</Text>
  </View>
);

const styles = StyleSheet.create({
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  checkboxLabel: { marginLeft: 12, fontSize: 16 },
});

export default SolvedCheckbox;