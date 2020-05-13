import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '@shared/Header/index';
import NavMenu from '@components/Menu';
import MenuPlus from './menuPlus';
import { useDispatch } from 'react-redux';
import { loadUser } from '@store/modules/user/actions';
import { Auth } from 'aws-amplify';
import HomeList from '@components/Document/index';

/**
 * The Home component
 * @param {object} loggedUser - The user logged object
 * @param {boolean} isLoggedIn - If the user is log in or not
 */
const Home = ({ loggedUser, isLoggedIn }) => {
  const [menuPlus, setMenuPlus] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // If the user just created his account
    if (!isLoggedIn) {
      initLoad();
    } else {
      loadCurrentAuthenticatedUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Load the user to the user store if the user is not already logged in
   */
  const initLoad = () => {
    const payload = {
      userId: loggedUser.username,
      token: loggedUser.signInUserSession.idToken.jwtToken
    };
    dispatch(loadUser(payload));
  };

  /**
   * Load the current user that is authenticated
   */
  const loadCurrentAuthenticatedUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      loadConnectedUser(user);
    }
  };

  /**
   * Load the connected user
   * @param {object} user - The user object
   */
  const loadConnectedUser = user => {
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
    <View style={styles.container}>
      <Header />
      <View style={styles.test}>
        <HomeList />
        <NavMenu openPlusMenu={() => openPlusMenu()} />
      </View>
      <MenuPlus setRefPlus={setRefPlus} />
    </View>
  );
};

/**
 * Styles of Home component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  input: {
    height: 50,
    borderColor: 'black',
    color: 'grey',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20
  },
  test: { flex: 1 }
});

export default Home;
