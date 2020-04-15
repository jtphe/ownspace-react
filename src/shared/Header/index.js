/* eslint-disable global-require */
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./cci_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003466',
    paddingBottom: 30,
    ...ifIphoneX(
      {
        paddingTop: 60
      },
      {
        paddingTop: 40
      }
    )
  },
  logo: {
    alignSelf: 'center',
    marginLeft: -10,
    resizeMode: 'contain',
    width: 50,
    height: 50
  }
});

export default Header;
