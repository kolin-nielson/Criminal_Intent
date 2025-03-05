import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { getCrimeById, addCrime, updateCrime, deleteCrime } from '../utils/crimeStorage';
import { SettingsContext } from '../context/SettingsContext';
import PhotoSelector from '../components/crime/PhotoSelector';
import DateSelector from '../components/crime/DateSelector';
import SolvedCheckbox from '../components/crime/SolvedCheckbox';
import SaveButton from '../components/crime/SaveButton';
import DeleteButton from '../components/crime/DeleteButton';
import TextInput from '../components/common/TextInput';
import { Title } from '../components/common/Typography';
import Toast from '../components/common/Toast';

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
  const [isSaved, setIsSaved] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: currentTheme.primaryColor },
      headerTintColor: '#fff',
    });
  }, [navigation, currentTheme]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
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
        showToast('Crime updated successfully!');
      } else {
        await addCrime(crimeData);
        showToast('New crime saved successfully!');
      }
      setIsSaved(true);
      
      // Reset saved status after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    } catch (error) {
      Alert.alert('Error', 'Failed to save crime');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Crime',
      'Are you sure you want to delete this crime?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCrime(id);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete crime');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <Toast 
        visible={toastVisible} 
        message={toastMessage}
        type="success"
      />
      <Title>Crime Details</Title>
      <PhotoSelector photo={photo} setPhoto={setPhoto} />
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="Enter crime title"
      />
      <TextInput
        label="Details"
        value={details}
        onChangeText={setDetails}
        placeholder="Enter crime details"
        multiline
        numberOfLines={4}
      />
      <DateSelector date={date} setDate={setDate} />
      <SolvedCheckbox solved={solved} setSolved={setSolved} />
      <SaveButton onPress={saveCrime} isSaved={isSaved} />
      {id && <DeleteButton onPress={handleDelete} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    position: 'relative',
  },
});

export default CrimeDetailScreen;