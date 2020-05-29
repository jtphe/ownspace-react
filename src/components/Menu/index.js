import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconMenu from './IconMenu';
import { Actions } from 'react-native-router-flux';
import { useDispatch } from 'react-redux';
import { loadFolders, loadFiles } from '@store/modules/document/actions';
import { CLIENT_COLOR_PRIMARY } from '@constants';

/**
 * The NavMenu component
 * @param {function} openPlusMenu - Open the plus menu
 */
const NavMenu = ({ openPlusMenu }) => {
  const [home, setHome] = useState(true);
  const [options, setOptions] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const dispatch = useDispatch();

  /**
   * Set the right icon to selected
   * @param {String} name - Icon name
   */
  const _setSelected = name => {
    switch (name) {
      case 'home':
        setHome(true);
        setOptions(false);
        setUserProfile(false);
        _openHome();
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
   * Go back to home folder
   */
  const _openHome = () => {
    dispatch(loadFolders());
    dispatch(loadFiles());
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
        setSelected={name => _setSelected(name)}
      />
      <IconMenu
        name="plus-circle"
        size={30}
        selected={options}
        setSelected={name => _setSelected(name)}
      />
      <IconMenu
        name="user"
        size={30}
        selected={userProfile}
        setSelected={name => _setSelected(name)}
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
    backgroundColor: CLIENT_COLOR_PRIMARY,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { width: 3, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 10
  }
});

export default NavMenu;
