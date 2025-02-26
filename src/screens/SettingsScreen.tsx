import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SettingsContext } from '../context/SettingsContext';

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const { theme, saveTheme, currentTheme } = useContext(SettingsContext);

  const themes = [
    { label: 'Purple', value: 'purple' },
    { label: 'Teal', value: 'teal' },
    { label: 'Emerald', value: 'emerald' },
    { label: 'Crimson', value: 'crimson' },
    { label: 'Indigo', value: 'indigo' },
    { label: 'Gold', value: 'gold' },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: currentTheme.primaryColor },
      headerTintColor: '#fff',
    });
  }, [navigation, currentTheme]);

  const handleThemeSelect = async (value: string) => {
    try {
      await saveTheme(value);
    } catch (error) {
      Alert.alert('Error', 'Failed to save theme');
    }
  };

  const renderThemeItem = ({ label, value }: { label: string; value: string }) => (
    <TouchableOpacity
      key={value}
      style={[
        styles.themeItem,
        { 
          backgroundColor: currentTheme.secondaryColor,
          borderColor: value === theme ? currentTheme.primaryColor : currentTheme.borderColor,
        }
      ]}
      onPress={() => handleThemeSelect(value)}
    >
      <Text style={[styles.themeText, { color: currentTheme.textColor }]}>
        {label}
      </Text>
      {value === theme && (
        <Text style={[styles.checkmark, { color: currentTheme.primaryColor }]}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <Text style={[styles.label, { color: currentTheme.textColor }]}>
        Select Theme:
      </Text>
      <ScrollView 
        style={styles.themeContainer}
        contentContainerStyle={styles.themeContent}
      >
        {themes.map(renderThemeItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  themeContainer: {
    maxHeight: 500,
    marginBottom: 20,
  },
  themeContent: {
    paddingVertical: 5,
  },
  themeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  themeText: {
    fontSize: 16,
  },
  checkmark: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;