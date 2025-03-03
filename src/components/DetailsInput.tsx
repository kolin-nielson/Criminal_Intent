import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Theme } from '../constants/themes';

interface DetailsInputProps {
  details: string;
  setDetails: (text: string) => void;
  theme: Theme;
}

const DetailsInput: React.FC<DetailsInputProps> = ({ details, setDetails, theme }) => (
  <TextInput
    placeholder="Describe what happened"
    value={details}
    onChangeText={setDetails}
    multiline
    style={[styles.input, styles.detailsInput, {
      borderColor: theme.borderColor,
      color: theme.textColor,
      backgroundColor: theme.secondaryColor,
    }]}
    placeholderTextColor={theme.placeholderColor}
  />
);

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 },
  detailsInput: { height: 120, textAlignVertical: 'top' },
});

export default DetailsInput;