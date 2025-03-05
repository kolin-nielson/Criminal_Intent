import React from 'react';
import Button from '../common/Button';

interface DeleteButtonProps {
  onPress: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onPress }) => (
  <Button
    title="DELETE CRIME"
    onPress={onPress}
    variant="danger"
    style={{ marginTop: 10 }}
  />
);

export default DeleteButton; 