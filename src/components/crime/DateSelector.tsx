import React from 'react';
import DatePicker from '../common/DatePicker';

interface DateSelectorProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, setDate }) => {
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      label="Date of Crime"
    />
  );
};

export default DateSelector; 