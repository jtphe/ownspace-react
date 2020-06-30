/* eslint-disable global-require */
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
const TextHelvetica = ({ style, ellipsizeMode, selectable, children }) => {
  useFonts({
    HelveticaNeue: require('../../../assets/fonts/HelveticaNeue.ttf'),
    HelveticaNeueBold: require('../../../assets/fonts/HelveticaNeue-Bold.ttf')
  });

  if (style && style.fontWeight === 'bold') {
    /**
     * Render the TextHelvetica component
     * @returns {React.Component} - TextHelvetica component
     */
    return (
      <Text
        style={[style, styles.fontBold]}
        ellipsizeMode={ellipsizeMode}
        selectable={selectable}
      >
        {children}
      </Text>
    );
  }

  /**
   * Render the TextHelvetica component
   * @returns {React.Component} - TextHelvetica component
   */
  return (
    <Text
      style={[style, styles.fontNormal]}
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
  fontNormal: {
    fontFamily: 'HelveticaNeue'
  },
  fontBold: {
    fontFamily: 'HelveticaNeueBold'
  }
});

TextHelvetica.defaultProps = {
  style: null,
  ellipsizeMode: 'tail',
  selectable: true,
  children: null
};

export default TextHelvetica;
