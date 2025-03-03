import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../constants/themes';

interface Crime {
  id: string;
  title: string;
  date: string;
  solved: boolean;
}

interface CrimeListItemProps {
  crime: Crime;
  onPress: () => void;
  theme: Theme;
}

const CrimeListItem: React.FC<CrimeListItemProps> = ({ crime, onPress, theme }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.listItem, { backgroundColor: theme.secondaryColor }]}
  >
    <View style={styles.listItemContent}>
      <View>
        <Text style={[styles.title, { color: theme.textColor }]}>
          {crime.title || 'Untitled Crime'}
        </Text>
        <Text style={[styles.date, { color: theme.placeholderColor }]}>
          {new Date(crime.date).toLocaleDateString()}
        </Text>
      </View>
      {crime.solved && (
        <MaterialCommunityIcons name="handcuffs" size={24} color="#000" style={styles.icon} />
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  listItemContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '600' },
  date: { fontSize: 12, marginTop: 2 },
  icon: { marginRight: 10 },
});

export default CrimeListItem;