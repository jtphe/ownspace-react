import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '@shared/Header/index';
import NavMenu from '@components/Menu';
import MenuPlus from './menuPlus';
import { useDispatch } from 'react-redux';
import { loadUser } from '@store/modules/user/actions';
import { Auth } from 'aws-amplify';

const Home = ({ loggedUser, isLoggedIn }) => {
  const [menuPlus, setMenuPlus] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      initLoad();
    } else {
      loadCurrentAuthenticatedUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const initLoad = () => {
    const payload = {
      userId: loggedUser.username,
      token: loggedUser.signInUserSession.idToken.jwtToken
    };
    dispatch(loadUser(payload));
  };

  const loadCurrentAuthenticatedUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      loadConnectedUser(user);
    }
  };

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
   * @param {Object} ref - Menu reference
   */
  const setRefPlus = ref => {
    setMenuPlus(ref);
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.test}>
        <NavMenu openPlusMenu={() => openPlusMenu()} />
      </View>
      <MenuPlus setRefPlus={setRefPlus} />
    </View>
  );
};

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
