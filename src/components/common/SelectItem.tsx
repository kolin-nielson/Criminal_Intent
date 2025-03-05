import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BodyText } from './Typography';

interface SelectItemProps {
  label: string;
  value: string;
  isSelected: boolean;
  onPress: () => void;
  style?: object;
}

const SelectItem: React.FC<SelectItemProps> = ({ 
  label, 
  value, 
  isSelected, 
  onPress,
  style
}) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: theme.secondaryColor,
          borderColor: isSelected ? theme.primaryColor : 'transparent',
        },
        style
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <BodyText style={{ color: '#fff' }}>{label}</BodyText>
        {isSelected && (
          <View style={[styles.selectedIndicator, { backgroundColor: theme.primaryColor }]} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default SelectItem; 