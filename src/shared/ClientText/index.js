/* eslint-disable global-require */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from '@use-expo/font';

/**
 * The custom TextClient component
 * @param {object} style - Style of the Text component
 * @param {string} ellipsizeMode - Defines how text will be truncated
 * @param {boolean} selectable - Lets the user select text, to use the native copy and paste functionality
 * @param {string} children - The string of the Text component
 */
const TextClient = props => {
  useFonts({
    DejaVuSans: require('../../../assets/fonts/DejaVuSans.ttf'),
    DejaVuSansBold: require('../../../assets/fonts/DejaVuSans-Bold.ttf')
  });

  const { style, ellipsizeMode, selectable, children } = props;

  if (style && style.fontWeight === 'bold') {
    /**
     * Render the TextClient component
     * @returns {React.Component} - TextClient component
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
   * Render the TextClient component
   * @returns {React.Component} - TextClient component
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
 * Styles of TextClient component
 */
const styles = StyleSheet.create({
  fontNormal: {
    fontFamily: 'DejaVuSans'
  },
  fontBold: {
    fontFamily: 'DejaVuSansBold'
  }
});

export default TextClient;
