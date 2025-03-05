import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ThemeItem from '../components/settings/ThemeItem';
import { SettingsContext } from '../context/SettingsContext';
import { Title } from '../components/common/Typography';

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const { theme, currentTheme, saveTheme } = useContext(SettingsContext);

  const themes = [
    { label: 'Midnight', value: 'midnight' },
    { label: 'Forest', value: 'forest' },
    { label: 'Graphite', value: 'graphite' },
    { label: 'Ocean', value: 'ocean' },
    { label: 'Sunrise', value: 'sunrise' },
    { label: 'Ivory', value: 'ivory' },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: currentTheme.primaryColor },
      headerTintColor: '#fff',
    });
  }, [navigation, currentTheme]);

  const handleThemeSelect = async (value: string) => {
    await saveTheme(value); // This should update the context
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <Title>Select Theme:</Title>
      <ScrollView style={styles.themeContainer} contentContainerStyle={styles.themeContent}>
        {themes.map(({ label, value }) => (
          <ThemeItem
            key={value}
            label={label}
            value={value}
            isSelected={value === theme}
            onPress={() => handleThemeSelect(value)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  themeContainer: { maxHeight: 500, marginBottom: 20 },
  themeContent: { paddingVertical: 5 },
});

export default SettingsScreen;