import React from 'react';
import ImagePicker from '../common/ImagePicker';

interface PhotoSelectorProps {
  photo: string | undefined;
  setPhoto: (uri: string | undefined) => void;
}

const PhotoSelector: React.FC<PhotoSelectorProps> = ({ photo, setPhoto }) => {
  return (
    <ImagePicker
      image={photo}
      onImageSelect={setPhoto}
      label="Crime Photo"
      placeholder="Add Crime Photo"
    />
  );
};

export default PhotoSelector; 