import React from 'react';
import Checkbox from '../common/Checkbox';

interface SolvedCheckboxProps {
  solved: boolean;
  setSolved: (solved: boolean) => void;
}

const SolvedCheckbox: React.FC<SolvedCheckboxProps> = ({ solved, setSolved }) => {
  return (
    <Checkbox
      checked={solved}
      onValueChange={setSolved}
      label="Case Solved"
    />
  );
};

export default SolvedCheckbox; 