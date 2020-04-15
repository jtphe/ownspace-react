import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '@shared/Header/index';
import NavMenu from '@components/Menu';
import MenuPlus from './menuPlus';

const Home = ({ loggedUser }) => {
  const [menuPlus, setMenuPlus] = useState('');

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
