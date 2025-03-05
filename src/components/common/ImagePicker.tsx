import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { BodyText } from './Typography';

interface ImagePickerProps {
  image?: string;
  onImageSelect: (uri?: string) => void;
  label?: string;
  placeholder?: string;
  style?: object;
  imageStyle?: object;
  size?: { width: number; height: number };
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  image,
  onImageSelect,
  label,
  placeholder = 'Add Image',
  style,
  imageStyle,
  size = { width: 200, height: 150 },
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      setLoading(true);
      const permissionResult = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'You need to grant camera roll permissions to select a photo.');
        return;
      }

      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelect(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onImageSelect(undefined) },
      ]
    );
  };

  return (
    <View style={[styles.container, style]}>
      {label && <BodyText style={styles.label}>{label}</BodyText>}
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={[
            styles.imageWrapper,
            { borderColor: theme.borderColor, width: size.width, height: size.height },
          ]}
          onPress={pickImage}
          disabled={loading}
        >
          {image ? (
            <Image source={{ uri: image }} style={[styles.image, imageStyle]} />
          ) : (
            <View style={styles.placeholder}>
              <MaterialIcons name="add-a-photo" size={40} color={theme.primaryColor} />
              <BodyText style={{ color: theme.textColor, marginTop: 8 }}>
                {placeholder}
              </BodyText>
            </View>
          )}
        </TouchableOpacity>
        
        {image && (
          <TouchableOpacity 
            style={[styles.removeButton, { backgroundColor: theme.primaryColor }]}
            onPress={handleRemoveImage}
          >
            <MaterialIcons name="close" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  imageContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  imageWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export default ImagePicker; 