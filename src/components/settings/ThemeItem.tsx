import React from 'react';
import SelectItem from '../common/SelectItem';

interface ThemeItemProps {
  label: string;
  value: string;
  isSelected: boolean;
  onPress: () => void;
}

const ThemeItem: React.FC<ThemeItemProps> = ({ label, value, isSelected, onPress }) => {
  return (
    <SelectItem
      label={label}
      value={value}
      isSelected={isSelected}
      onPress={onPress}
    />
  );
};

export default ThemeItem; 