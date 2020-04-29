import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconMenu from './IconMenu';
import { Actions } from 'react-native-router-flux';

/**
 * The NavMenu component
 * @param {function} openPlusMenu - Open the plus menu
 */
const NavMenu = ({ openPlusMenu }) => {
  const [home, setHome] = useState(true);
  const [options, setOptions] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  /**
   * Set the right icon to selected
   * @param {String} name - Icon name
   */
  const setSelected = name => {
    switch (name) {
      case 'home':
        setHome(true);
        setOptions(false);
        setUserProfile(false);
        break;
      case 'plus-circle':
        setHome(false);
        setOptions(true);
        setUserProfile(false);
        openPlusMenu();
        break;
      case 'user':
        setHome(false);
        setOptions(false);
        setUserProfile(true);
        Actions.userProfile();
        setHome(true);
        setOptions(false);
        setUserProfile(false);
        break;
      default:
        setHome(true);
        setOptions(false);
        setUserProfile(false);
    }
  };

  /**
   * Render the NavMenu component
   * @returns {React.Component} - NavMenu component
   */
  return (
    <View style={styles.menuContainer}>
      <IconMenu
        name="home"
        size={30}
        selected={home}
        setSelected={name => setSelected(name)}
      />
      <IconMenu
        name="plus-circle"
        size={30}
        selected={options}
        setSelected={name => setSelected(name)}
      />
      <IconMenu
        name="user"
        size={30}
        selected={userProfile}
        setSelected={name => setSelected(name)}
      />
    </View>
  );
};

/**
 * Styles of NavMenu component
 */
const styles = StyleSheet.create({
  menuContainer: {
    zIndex: 100,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#003466',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default NavMenu;
