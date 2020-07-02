import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Platform } from 'react-native';
import Text from '@shared/ClientText';
import Header from '@shared/Header/index';
import NavMenu from '@components/Menu';
import MenuPlus from './menuPlus';
import HomeList from '@components/Document/index';
import { Auth } from 'aws-amplify';
import { connect, useDispatch } from 'react-redux';
import { loadUser } from '@store/modules/user/actions';
import NetInfo from '@react-native-community/netinfo';
import { createSelector } from 'reselect';
import { getIsInternetReachable } from '@store/modules/app/selectors';
import i18n from '@i18n/i18n';
import { CLIENT_COLOR_SECONDARY } from '@constants/';

const mapStateToProps = createSelector(
  getIsInternetReachable,
  isConnectedToInternet => {
    return {
      isConnectedToInternet
    };
  }
);

/**
 * The Home component
 * @param {object} loggedUser - The user logged object
 * @param {boolean} isLoggedIn - If the user is log in or not
 */
const Home = ({ userJustCreated, isConnectedToInternet }) => {
  const [menuPlus, setMenuPlus] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userJustCreated === true) {
      _loadCurrentAuthenticatedUser();
    }
    NetInfo.addEventListener(({ isInternetReachable }) => {
      dispatch({ type: 'M_UPDATE_INTERNET_STATE', value: isInternetReachable });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_loadCurrentAuthenticatedUser, userJustCreated]);

  /**
   * Load the current user that is authenticated
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _loadCurrentAuthenticatedUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      _loadConnectedUser(user);
    }
  };

  /**
   * Load the connected user
   * @param {object} user - The user object
   */
  const _loadConnectedUser = user => {
    const payload = {
      userId: user.attributes.sub,
      token: user.signInUserSession.idToken.jwtToken
    };
    dispatch(loadUser(payload));
  };

  /**
   * Open the plus menu
   */
  const openPlusMenu = () => {
    menuPlus.open();
  };

  /**
   * Set the menu reference
   * @param {object} ref - Menu reference
   */
  const setRefPlus = ref => {
    setMenuPlus(ref);
  };

  /**
   * Render the Home component
   * @returns {React.Component} - Home component
   */
  return (
    <View style={styles.globalContainer}>
      <Header />
      {!isConnectedToInternet ? (
        <SafeAreaView style={styles.noInternetContainer}>
          <Text style={styles.noInternetText}>{i18n.t('home.noInternet')}</Text>
        </SafeAreaView>
      ) : null}
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <HomeList />
          <NavMenu openPlusMenu={() => openPlusMenu()} />
        </View>
        <MenuPlus setRefPlus={setRefPlus} />
      </View>
    </View>
  );
};

/**
 * Styles of Home component
 */
const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  container: {
    flex: 1
  },
  homeContainer: { flex: 1 },
  noInternetContainer: {
    backgroundColor: CLIENT_COLOR_SECONDARY
  },
  noInternetText: {
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default connect(mapStateToProps)(Home);
