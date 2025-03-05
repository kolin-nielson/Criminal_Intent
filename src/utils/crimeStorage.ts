import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Crime {
  id: string;
  title: string;
  details: string;
  date: string;
  solved: boolean;
  photo?: string;
}

const CRIMES_KEY = '@crimes';

export const getCrimes = async (): Promise<Crime[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(CRIMES_KEY);
    const crimes = jsonValue ? JSON.parse(jsonValue) : [];
    return Array.isArray(crimes) ? crimes : [];
  } catch (error) {
    console.error('Error getting crimes:', error);
    return [];
  }
};

export const saveCrimes = async (crimes: Crime[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CRIMES_KEY, JSON.stringify(crimes));
  } catch (error) {
    console.error('Error saving crimes:', error);
    return Promise.reject(new Error('Failed to save crimes to storage'));
  }
};

export const addCrime = async (crime: Crime): Promise<Crime> => {
  try {
    const crimes = await getCrimes();
    const updatedCrimes = [...crimes, crime];
    await saveCrimes(updatedCrimes);
    return crime;
  } catch (error) {
    console.error('Error adding crime:', error);
    return Promise.reject(new Error('Failed to add crime'));
  }
};

export const updateCrime = async (id: string, updatedCrime: Crime): Promise<void> => {
  try {
    const crimes = await getCrimes();
    const index = crimes.findIndex((crime) => crime.id === id);
    if (index === -1) {
      return Promise.reject(new Error('Crime not found'));
    }
    crimes[index] = { ...updatedCrime, id };
    await saveCrimes(crimes);
  } catch (error) {
    console.error('Error updating crime:', error);
    return Promise.reject(new Error('Failed to update crime'));
  }
};

export const getCrimeById = async (id: string): Promise<Crime | undefined> => {
  try {
    const crimes = await getCrimes();
    return crimes.find((crime) => crime.id === id);
  } catch (error) {
    console.error('Error getting crime by ID:', error);
    return undefined;
  }
};

export const deleteCrime = async (id: string): Promise<void> => {
  try {
    const crimes = await getCrimes();
    const updatedCrimes = crimes.filter((crime) => crime.id !== id);
    await saveCrimes(updatedCrimes);
  } catch (error) {
    console.error('Error deleting crime:', error);
    return Promise.reject(new Error('Failed to delete crime'));
  }
};