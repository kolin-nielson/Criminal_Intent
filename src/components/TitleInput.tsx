import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Theme } from '../constants/themes';

interface TitleInputProps {
  title: string;
  setTitle: (text: string) => void;
  theme: Theme;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle, theme }) => (
  <TextInput
    placeholder="Enter crime title"
    value={title}
    onChangeText={setTitle}
    style={[styles.input, {
      borderColor: theme.borderColor,
      color: theme.textColor,
      backgroundColor: theme.secondaryColor,
    }]}
    placeholderTextColor={theme.placeholderColor}
  />
);

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 },
});

export default TitleInput;