import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../constants/themes';

interface PhotoSelectorProps {
  photo: string | undefined;
  setPhoto: (uri: string) => void;
  theme: Theme;
}

const PhotoSelector: React.FC<PhotoSelectorProps> = ({ photo, setPhoto, theme }) => {
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Camera roll permissions denied');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false, // Disable cropping
        quality: 0.7, 
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  return (
    <View style={styles.photoContainer}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.photo} />
      ) : (
        <View style={[styles.photoPlaceholder, { backgroundColor: theme.secondaryColor }]}>
          <MaterialCommunityIcons name="image" size={30} color={theme.placeholderColor} />
        </View>
      )}
      <TouchableOpacity
        onPress={pickImage}
        style={[styles.cameraButton, { borderColor: theme.primaryColor }]}
      >
        <MaterialCommunityIcons name="camera" size={24} color={theme.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  photo: { width: 100, height: 100, borderRadius: 8, marginRight: 12 },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cameraButton: { padding: 12, borderWidth: 2, borderRadius: 8 },
});

export default PhotoSelector;