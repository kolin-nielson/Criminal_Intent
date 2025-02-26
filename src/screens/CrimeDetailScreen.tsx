import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getCrimeById, addCrime, updateCrime } from '../utils/crimeStorage';
import { SettingsContext } from '../context/SettingsContext';

interface Crime {
  id: string;
  title: string;
  details: string;
  date: string;
  solved: boolean;
  photo?: string;
}

const CrimeDetailScreen = ({ navigation }: { navigation: any }) => {
  const route = useRoute<any>();
  const { id } = route.params || {};
  const { currentTheme } = useContext(SettingsContext);
  
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState(new Date());
  const [solved, setSolved] = useState(false);
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (id) {
      const loadCrime = async () => {
        try {
          const crime = await getCrimeById(id);
          if (crime) {
            setTitle(crime.title);
            setDetails(crime.details);
            setDate(new Date(crime.date));
            setSolved(crime.solved);
            setPhoto(crime.photo);
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to load crime data');
        }
      };
      loadCrime();
    }
  }, [id]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: currentTheme.primaryColor },
      headerTintColor: '#fff',
    });
  }, [navigation, currentTheme]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Camera roll permissions denied');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const saveCrime = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    try {
      const crimeData: Crime = {
        id: id || uuid.v4() as string,
        title: title.trim(),
        details: details.trim(),
        date: date.toISOString(),
        solved,
        photo,
      };

      if (id) {
        await updateCrime(crimeData.id, crimeData);
      } else {
        await addCrime(crimeData);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save crime');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={styles.photoContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <View style={[styles.photoPlaceholder, { backgroundColor: currentTheme.secondaryColor }]}>
            <MaterialCommunityIcons 
              name="image" 
              size={30} 
              color={currentTheme.placeholderColor} 
            />
          </View>
        )}
        <TouchableOpacity 
          onPress={pickImage} 
          style={[styles.cameraButton, { borderColor: currentTheme.primaryColor }]}
        >
          <MaterialCommunityIcons name="camera" size={24} color={currentTheme.primaryColor} />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Enter crime title"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { 
          borderColor: currentTheme.borderColor,
          color: currentTheme.textColor,
          backgroundColor: currentTheme.secondaryColor,
        }]}
        placeholderTextColor={currentTheme.placeholderColor}
      />
      
      <Text style={[styles.label, { color: currentTheme.textColor }]}>
        Details:
      </Text>
      <TextInput
        placeholder="Describe what happened"
        value={details}
        onChangeText={setDetails}
        multiline
        style={[styles.input, styles.detailsInput, { 
          borderColor: currentTheme.borderColor,
          color: currentTheme.textColor,
          backgroundColor: currentTheme.secondaryColor,
        }]}
        placeholderTextColor={currentTheme.placeholderColor}
      />

      <TouchableOpacity
        style={[styles.dateButton, { backgroundColor: currentTheme.primaryColor }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => setSolved(!solved)}
          style={[
            styles.checkbox,
            { borderColor: currentTheme.textColor },
            solved && { backgroundColor: currentTheme.primaryColor, borderColor: currentTheme.primaryColor },
          ]}
        >
          {solved && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={[styles.checkboxLabel, { color: currentTheme.textColor }]}>
          Solved
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: currentTheme.primaryColor }]}
        onPress={saveCrime}
      >
        <Text style={styles.saveButtonText}>SAVE CRIME</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cameraButton: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  detailsInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  dateButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    marginLeft: 12,
    fontSize: 16,
  },
  saveButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CrimeDetailScreen;