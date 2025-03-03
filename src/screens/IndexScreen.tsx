import React, { useState, useCallback, useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getCrimes } from '../utils/crimeStorage';
import { SettingsContext } from '../context/SettingsContext';

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

  useFocusEffect(
    React.useCallback(() => {
      fetchCrimes();
    }, [fetchCrimes])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: currentTheme.primaryColor },
      headerTintColor: '#fff',
    });
  }, [navigation, currentTheme]);

  const renderItem = ({ item }: { item: Crime }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CrimeDetail', { id: item.id })}
      style={[styles.listItem, { backgroundColor: currentTheme.secondaryColor }]}
    >
      <View style={styles.listItemContent}>
        <View>
          <Text style={[styles.title, { color: currentTheme.textColor }]}>
            {item.title || 'Untitled Crime'}
          </Text>
          <Text style={[styles.date, { color: currentTheme.placeholderColor }]}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        {item.solved && (
          <MaterialCommunityIcons 
            name="handcuffs" 
            size={24} 
            color={"#000"} 
            style={styles.icon} 
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <FlatList
        data={crimes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
  container: {
    flex: 1,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    marginTop: 2,
  },
  icon: {
    marginRight: 10,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
});

export default IndexScreen;