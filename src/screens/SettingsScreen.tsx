import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ThemeItem from '../components/ThemeItem';
import { SettingsContext } from '../context/SettingsContext';

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

  React.useLayoutEffect(() => {
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
      <Text style={[styles.label, { color: currentTheme.textColor }]}>Select Theme:</Text>
      <ScrollView style={styles.themeContainer} contentContainerStyle={styles.themeContent}>
        {themes.map(({ label, value }) => (
          <ThemeItem
            key={value}
            label={label}
            value={value}
            isSelected={value === theme}
            onPress={() => handleThemeSelect(value)}
            theme={currentTheme}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  themeContainer: { maxHeight: 500, marginBottom: 20 },
  themeContent: { paddingVertical: 5 },
});

export default SettingsScreen;