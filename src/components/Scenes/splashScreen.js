/* eslint-disable global-require */
import React from 'react';
import { ImageBackground, StyleSheet, Animated, Image } from 'react-native';
import Text from '@shared/Text';
import Logo from '@shared/Logo/images/os_logo.png';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Actions } from 'react-native-router-flux';
import i18n from '@i18n/i18n';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoAnime: new Animated.Value(0),
      logoText: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const { logoAnime, logoText } = this.state;

    Animated.parallel([
      Animated.spring(logoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1500
      }).start(),

      Animated.timing(logoText, {
        toValue: 1,
        duration: 2000
      })
    ]).start(() => {
      Actions.login();
    });
  }

  render() {
    const { logoAnime, logoText } = this.state;

    return (
      <ImageBackground
        source={require('@images/background_ownspace.png')}
        style={styles.container}
      >
        <Animated.View
          style={[
            {
              opacity: logoAnime,
              top: logoAnime.interpolate({
                inputRange: [0, 1],
                outputRange: [80, 0]
              })
            },
            styles.containerLogo
          ]}
        >
          <Image source={Logo} style={styles.logo} />
        </Animated.View>
        <Animated.View style={[{ opacity: logoText }, styles.containerSlogan]}>
          <Text style={styles.sloganPartOne}>
            {i18n.t('splashScreen.sloganPartOne')}
          </Text>
          <Text style={styles.sloganPartTwo}>
            {i18n.t('splashScreen.sloganPartTwo')}
          </Text>
        </Animated.View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  containerSlogan: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24
  },
  sloganPartOne: { color: 'white', fontSize: 34, paddingTop: 2 },
  sloganPartTwo: { fontWeight: 'bold', color: 'white', fontSize: 36 },
  logo: { width: 250, height: 250 },
  containerLogo: {
    justifyContent: 'flex-start',
    flex: 1,
    ...ifIphoneX(
      {
        paddingTop: 100,
        paddingBottom: 70
      },
      {
        paddingTop: 60,
        paddingBottom: 40
      }
    )
  }
});

export default SplashScreen;
