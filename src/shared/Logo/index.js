/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, Image } from 'react-native';

/**
 * The Logo component
 */
const Logo = () => {
  /**
   * Render the Logo component
   * @returns {React.Component} - Logo component
   */
  return (
    <Image
      source={require('./images/os_logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  );
};

/**
 * Styles of Logo component
 */
const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginLeft: -10,
    resizeMode: 'contain',
    width: 100,
    height: 100
  }
});
export default Logo;
