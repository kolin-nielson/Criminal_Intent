import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../context/ThemeContext';
import { BodyText } from './Typography';
import Button from './Button';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
  format?: (date: Date) => string;
  style?: object;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  value, 
  onChange, 
  label, 
  format, 
  style 
}) => {
  const theme = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const formatDate = (date: Date) => {
    if (format) {
      return format(date);
    }
    return date.toLocaleDateString();
  };

  return (
    <View style={[styles.container, style]}>
      {label && <BodyText style={styles.label}>{label}</BodyText>}
      <TouchableOpacity
        onPress={togglePicker}
        style={[styles.dateDisplay, { borderColor: theme.borderColor }]}
      >
        <BodyText>{formatDate(value)}</BodyText>
      </TouchableOpacity>

      {(showPicker || Platform.OS === 'ios') && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={value}
            mode="date"
            display="default"
            onChange={handleChange}
            style={styles.picker}
            textColor={theme.textColor}
          />
          {Platform.OS === 'ios' && (
            <Button
              title="Done"
              onPress={() => setShowPicker(false)}
              variant="primary"
              style={styles.doneButton}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  dateDisplay: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
  },
  pickerContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  picker: {
    width: '100%',
  },
  doneButton: {
    marginTop: 8,
    width: '50%',
  },
});

export default DatePicker; 