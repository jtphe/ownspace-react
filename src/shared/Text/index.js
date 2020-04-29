import React from 'react';

import { Text, StyleSheet } from 'react-native';
import { useFonts } from '@use-expo/font';

/**
 * The custom OwnSpace's Text component
 * @param {object} style - Style of the Text component
 * @param {string} ellipsizeMode - Defines how text will be truncated
 * @param {boolean} selectable - Lets the user select text, to use the native copy and paste functionality
 * @param {string} children - The string of the Text component
 */
const TextHelvetica = props => {
  useFonts({
    // eslint-disable-next-line global-require
    HelveticaNeue: require('../../../assets/fonts/HelveticaNeue.ttf')
  });

  const { style, ellipsizeMode, selectable, children } = props;

  /**
   * Render the TextHelvetica component
   * @returns {React.Component} - TextHelvetica component
   */
  return (
    <Text
      style={[style, styles.fontStyle]}
      ellipsizeMode={ellipsizeMode}
      selectable={selectable}
    >
      {children}
    </Text>
  );
};

/**
 * Styles of TextHelvetica component
 */
const styles = StyleSheet.create({
  fontStyle: { fontFamily: 'HelveticaNeue' }
});

export default TextHelvetica;
