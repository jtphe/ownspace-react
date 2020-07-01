/* eslint-disable global-require */
import React from 'react';
import { ImageBackground, StyleSheet, Animated, Image } from 'react-native';
import Text from '@shared/Text';
import Logo from '@shared/Logo/images/os_logo.png';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Actions } from 'react-native-router-flux';
import i18n from '@i18n/i18n';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getToken } from '@store/modules/user/selectors';
import * as Font from 'expo-font';

/**
 * Connect to the store and extract data
 */
const mapStateToProps = createSelector(getToken, token => {
  return {
    isLoggedIn: token !== null
  };
});

/**
 * Require the client font
 */
const clientFont = {
  DejaVuSans: require('../../../assets/fonts/DejaVuSans.ttf'),
  DejaVuSansBold: require('../../../assets/fonts/DejaVuSans-Bold.ttf')
};

/**
 * Require OwnSpace font
 */
const helveticaFont = {
  HelveticaNeue: require('../../../assets/fonts/HelveticaNeue.ttf'),
  HelveticaNeueBold: require('../../../assets/fonts/HelveticaNeue-Bold.ttf')
};

/**
 * The SplashScreen class
 */
class SplashScreen extends React.Component {
  /**
   * SplashScreen constructor
   * @param {props} props - SplashScreen props
   */
  constructor(props) {
    super(props);

    /**
     * logoAnime: The logo image animation |
     * logoText: The logo text animation
     * @type {{logoAnime: Animated, logoText: Animated}}
     */
    this.state = {
      logoAnime: new Animated.Value(0),
      logoText: new Animated.Value(0),
      clientFontLoaded: false,
      ownspaceFontLoaded: false
    };
  }

  /**
   * Load client and OwnSpace fonts when componentWillMount
   */
  UNSAFE_componentWillMount() {
    this.loadClientFont();
    this.loadOwnSpaceFont();
  }

  /**
   * Make animations when componentDidMount
   */
  componentDidMount() {
    const { logoAnime, logoText } = this.state;
    const { isLoggedIn } = this.props;

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
      isLoggedIn ? Actions.home() : Actions.login();
    });
  }

  /**
   * Load client's font
   */
  loadClientFont = async () => {
    await Font.loadAsync(clientFont);
    this.setState({
      ownspaceFontLoaded: true
    });
  };

  /**
   * Load Ownspace's font
   */
  loadOwnSpaceFont = async () => {
    await Font.loadAsync(helveticaFont);
    this.setState({
      clientFontLoaded: true
    });
  };

  /**
   * Render the SplashScreen class
   * @returns {React.Component} - SplashScreen class
   */
  render() {
    const {
      logoAnime,
      logoText,
      ownspaceFontLoaded,
      clientFontLoaded
    } = this.state;

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
        {ownspaceFontLoaded && clientFontLoaded ? (
          <Animated.View
            style={[{ opacity: logoText }, styles.containerSlogan]}
          >
            <Text style={styles.sloganPartOne}>
              {i18n.t('splashScreen.sloganPartOne')}
            </Text>
            <Text style={styles.sloganPartTwo}>
              {i18n.t('splashScreen.sloganPartTwo')}
            </Text>
          </Animated.View>
        ) : null}
      </ImageBackground>
    );
  }
}

/**
 * Styles of the SplashScreen class
 */
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
  sloganPartTwo: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 36
  },
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

export default connect(mapStateToProps)(SplashScreen);
