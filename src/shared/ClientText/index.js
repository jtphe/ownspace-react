/* eslint-disable global-require */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from '@use-expo/font';
import { CLIENT_FONT, CLIENT_FONT_BOLD } from '@constants';

/**
 * The custom TextClient component
 * @param {object} style - Style of the Text component
 * @param {string} ellipsizeMode - Defines how text will be truncated
 * @param {boolean} selectable - Lets the user select text, to use the native copy and paste functionality
 * @param {string} children - The string of the Text component
 */
const TextClient = ({ style, ellipsizeMode, selectable, children }) => {
  useFonts({
    DejaVuSans: require('../../../assets/fonts/DejaVuSans.ttf'),
    DejaVuSansBold: require('../../../assets/fonts/DejaVuSans-Bold.ttf')
  });

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
    fontFamily: CLIENT_FONT
  },
  fontBold: {
    fontFamily: CLIENT_FONT_BOLD
  }
});

TextClient.defaultProps = {
  style: null,
  ellipsizeMode: 'tail',
  selectable: true,
  children: null
};

export default TextClient;
