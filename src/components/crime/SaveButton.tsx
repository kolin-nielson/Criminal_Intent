import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import Button from '../common/Button';
import { MaterialIcons } from '@expo/vector-icons';

interface SaveButtonProps {
  onPress: () => void;
  isSaved?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onPress, isSaved = false }) => {
  // If saved, show a success button with an icon
  if (isSaved) {
    return (
      <View style={styles.container}>
        <Button
          title="SAVED SUCCESSFULLY"
          onPress={onPress}
          variant="secondary" // Use green to indicate success
          style={styles.savedButton}
        />
        <View style={styles.iconContainer}>
          <MaterialIcons name="check-circle" size={24} color="#fff" />
        </View>
      </View>
    );
  }

  // Otherwise show the normal save button
  return (
    <Button
      title="SAVE CRIME"
      onPress={onPress}
      variant="primary"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 5,
  },
  savedButton: {
    backgroundColor: '#28a745', // Success green color
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }], // Half the height of the icon
  }
});

export default SaveButton; 