/* eslint-disable global-require */
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

const WithBack = ({ goTo }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer} onPress={goTo}>
        <Icon name="ios-arrow-back" size={38} color="white" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={require('./cci_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 50,
    height: 50
  },
  logoContainer: {
    alignItems: 'center',
    marginLeft: 136
  },
  backContainer: { marginLeft: 30, marginTop: 8 }
});

export default WithBack;
