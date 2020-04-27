import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from '@use-expo/font';

const TextClient = props => {
  useFonts({
    // eslint-disable-next-line global-require
    DejaVuSans: require('../../../assets/fonts/DejaVuSans.ttf')
  });
  const { style, ellipsizeMode, selectable, children } = props;
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

const styles = StyleSheet.create({
  fontStyle: { fontFamily: 'DejaVuSans' }
});

export default TextClient;
