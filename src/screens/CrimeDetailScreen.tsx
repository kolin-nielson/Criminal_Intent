import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { getCrimeById, addCrime, updateCrime, deleteCrime } from '../utils/crimeStorage';
import { SettingsContext } from '../context/SettingsContext';
import PhotoSelector from '../components/PhotoSelector';
import TitleInput from '../components/TitleInput';
import DetailsInput from '../components/DetailsInput';
import DateSelector from '../components/DateSelector';
import SolvedCheckbox from '../components/SolvedCheckbox';
import SaveButton from '../components/SaveButton';
import DeleteButton from '../components/DeleteButton';

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
      <PhotoSelector photo={photo} setPhoto={setPhoto} theme={currentTheme} />
      <TitleInput title={title} setTitle={setTitle} theme={currentTheme} />
      <Text style={[styles.label, { color: currentTheme.textColor }]}>Details:</Text>
      <DetailsInput details={details} setDetails={setDetails} theme={currentTheme} />
      <DateSelector date={date} setDate={setDate} theme={currentTheme} />
      <SolvedCheckbox solved={solved} setSolved={setSolved} theme={currentTheme} />
      <SaveButton onPress={saveCrime} theme={currentTheme} />
      {id && <DeleteButton onPress={handleDelete} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
});

export default CrimeDetailScreen;