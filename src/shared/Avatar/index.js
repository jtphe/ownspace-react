import React from 'react';
import { Image } from 'react-native';
import { CLIENT_COLOR_PRIMARY } from '@constants';

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
      borderColor: CLIENT_COLOR_PRIMARY,
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
          image === null ? 'http://eliseretouches.com/media/avatar.png' : image
      }}
      style={[_typeStyle()]}
    />
  );
};

export default Avatar;
