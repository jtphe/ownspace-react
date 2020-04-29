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
    // eslint-disable-next-line global-require
    DejaVuSans: require('../../../assets/fonts/DejaVuSans.ttf')
  });
  const { style, ellipsizeMode, selectable, children } = props;

  /**
   * Render the TextClient component
   * @returns {React.Component} - TextClient component
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
 * Styles of TextClient component
 */
const styles = StyleSheet.create({
  fontStyle: { fontFamily: 'DejaVuSans' }
});

export default TextClient;
