import React from 'react';
import { Image } from 'react-native';

const Avatar = ({ image, size, borderRadius }) => {
  /**
   * Get the style
   */
  const _typeStyle = () => {
    return {
      width: size,
      height: size,
      borderRadius,
      borderColor: '#003466',
      borderWidth: 1
    };
  };

  return (
    <Image
      source={{
        uri:
          image === null
            ? 'https://jtphe.ddns.net/public/images/profilePicture.png'
            : image
      }}
      style={[_typeStyle()]}
    />
  );
};

export default Avatar;
