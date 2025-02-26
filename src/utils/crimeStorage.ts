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
    throw error;
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
    throw error;
  }
};

export const updateCrime = async (id: string, updatedCrime: Crime): Promise<void> => {
  try {
    const crimes = await getCrimes();
    const index = crimes.findIndex((crime) => crime.id === id);
    if (index === -1) {
      throw new Error('Crime not found');
    }
    crimes[index] = { ...updatedCrime, id };
    await saveCrimes(crimes);
  } catch (error) {
    console.error('Error updating crime:', error);
    throw error;
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