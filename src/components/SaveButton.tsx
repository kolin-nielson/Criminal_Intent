import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Theme } from '../constants/themes';

interface SaveButtonProps {
  onPress: () => void;
  theme: Theme;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onPress, theme }) => (
  <TouchableOpacity
    style={[styles.saveButton, { backgroundColor: theme.primaryColor }]}
    onPress={onPress}
  >
    <Text style={styles.saveButtonText}>SAVE CRIME</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  saveButton: { padding: 14, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default SaveButton;