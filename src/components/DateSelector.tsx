import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Theme } from '../constants/themes';

interface DateSelectorProps {
  date: Date;
  setDate: (date: Date) => void;
  theme: Theme;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, setDate, theme }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={[styles.dateButton, { backgroundColor: theme.primaryColor }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dateButton: { padding: 12, borderRadius: 8, marginBottom: 16 },
  dateButtonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});

export default DateSelector;