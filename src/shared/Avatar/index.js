import React from 'react';
import { Image } from 'react-native';

/**
 * The Avatar component
 * @param {string} image - URL or URI of the image
 * @param {number} size - The avatar's size
 * @param {number} borderRadius - The avatar's border radius
 */
const Avatar = ({ image, size, borderRadius }) => {
  /**
   * Get the avatar style
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

  /**
   * Render the Avatar component
   * @returns {React.Component} - The Avatar component
   */
  return (
    <Image
      source={{
        uri:
          image === null
            ? 'https://jtphe.ddns.net/ownspace/medias/avatar.png'
            : image
      }}
      style={[_typeStyle()]}
    />
  );
};

export default Avatar;
