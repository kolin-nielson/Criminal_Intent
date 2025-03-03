import React, { useState, useCallback, useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getCrimes } from '../utils/crimeStorage';
import { SettingsContext } from '../context/SettingsContext';
import CrimeListItem from '../components/CrimeListItem';

interface Crime {
  id: string;
  title: string;
  details: string;
  date: string;
  solved: boolean;
  photo?: string;
}

const IndexScreen = ({ navigation }: { navigation: any }) => {
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const { currentTheme } = useContext(SettingsContext);

  const fetchCrimes = useCallback(async () => {
    try {
      const crimesData = await getCrimes();
      setCrimes(crimesData);
    } catch (error) {
      console.error('Failed to fetch crimes:', error);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchCrimes(); }, [fetchCrimes]));

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: currentTheme.primaryColor },
      headerTintColor: '#fff',
    });
  }, [navigation, currentTheme]);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <FlatList
        data={crimes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CrimeListItem
            crime={item}
            onPress={() => navigation.navigate('CrimeDetail', { id: item.id })}
            theme={currentTheme}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: currentTheme.textColor }]}>
            No crimes recorded
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyText: { textAlign: 'center', padding: 20, fontSize: 16 },
});

export default IndexScreen;