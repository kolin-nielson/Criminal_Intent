import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Title, BodyText } from '../common/Typography';

interface Crime {
  id: string;
  title: string;
  date: string;
  solved: boolean;
}

interface CrimeListItemProps {
  crime: Crime;
  onPress: () => void;
}

const CrimeListItem: React.FC<CrimeListItemProps> = ({ crime, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.listItem, { backgroundColor: theme.secondaryColor }]}
    >
      <View style={styles.listItemContent}>
        <View>
          <Title style={styles.title}>
            {crime.title || 'Untitled Crime'}
          </Title>
          <BodyText style={{ color: '#fff' }}>
            {new Date(crime.date).toLocaleDateString()}
          </BodyText>
        </View>
        {crime.solved && (
          <MaterialCommunityIcons name="handcuffs" size={24} color="#fff" style={styles.icon} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
    borderRadius: 8,
  },
  listItemContent: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 16, 
    marginBottom: 2,
    color: '#fff'
  },
  icon: { marginRight: 10 },
});

export default CrimeListItem; 