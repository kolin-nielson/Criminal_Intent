import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface DeleteButtonProps {
  onPress: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.deleteButton} onPress={onPress}>
    <Text style={styles.deleteButtonText}>DELETE CRIME</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  deleteButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#e74c3c', // Red color for destructive action
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeleteButton;