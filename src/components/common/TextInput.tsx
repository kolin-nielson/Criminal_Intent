import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View, Text } from 'react-native';
import { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  label?: string;
  numberOfLines?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder = '',
  multiline = false,
  label,
  numberOfLines = 1,
}) => {
  const { currentTheme } = useContext(SettingsContext);
  
  // Determine if we're using a dark theme
  const isDarkTheme = currentTheme.backgroundColor.includes('#1') || 
                      currentTheme.backgroundColor.includes('#2');
  
  // Input background should contrast with the page background
  const inputBackgroundColor = isDarkTheme ? '#3a4a5f' : '#ffffff';
  
  // Text color should be bright on dark backgrounds and dark on light backgrounds
  const inputTextColor = isDarkTheme ? '#ffffff' : '#333333';
  
  // Placeholder color should be visible but not as prominent as the text
  const placeholderColor = isDarkTheme ? '#9eb3cb' : '#888888';

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: currentTheme.textColor }]}>
          {label}
        </Text>
      )}
      <RNTextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          {
            color: inputTextColor,
            borderColor: currentTheme.borderColor,
            backgroundColor: inputBackgroundColor
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 16,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default TextInput; 