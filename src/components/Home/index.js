import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '@shared/Header/index';
import NavMenu from '@components/Menu';
import MenuPlus from './menuPlus';
import HomeList from '@components/Document/index';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { loadUser } from '@store/modules/user/actions';

/**
 * The Home component
 * @param {object} loggedUser - The user logged object
 * @param {boolean} isLoggedIn - If the user is log in or not
 */
const Home = ({ userJustCreated }) => {
  const [menuPlus, setMenuPlus] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userJustCreated === true) {
      _loadCurrentAuthenticatedUser();
    }
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
  homeContainer: { flex: 1 }
});

export default Home;
