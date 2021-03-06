import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DotIcon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CLIENT_COLOR_SECONDARY } from '@constants';

/**
 * The IconMenu component
 * @param {string} name - The icon name
 * @param {number} size - The icon size
 * @param {boolean} selected - If the icon is selected or not
 * @param {function} setSelected - Set the icon to selected
 */
const IconMenu = ({ name, size, selected, setSelected }) => {
  /**
   * Get the color of the icon
   */
  const getColor = () => {
    if (selected) {
      return CLIENT_COLOR_SECONDARY;
    } else {
      return 'white';
    }
  };

  /**
   * Get the style of the icon when it's selected
   */
  const getStyle = () => {
    if (selected) {
      return { marginTop: 20 };
    } else {
      return null;
    }
  };

  /**
   * Render the IconMenu component
   * @returns {React.Component} - IconMenu component
   */
  return (
    <View style={[styles.containerIcon, getStyle()]}>
      <TouchableOpacity onPress={() => setSelected(name)}>
        <Icon style={styles.icon} name={name} size={size} color={getColor()} />
      </TouchableOpacity>
      {selected ? (
        <DotIcon name="dot-single" size={20} color={CLIENT_COLOR_SECONDARY} />
      ) : null}
    </View>
  );
};

/**
 * Styles of IconMenu component
 */
const styles = StyleSheet.create({
  containerIcon: { flexDirection: 'column', alignItems: 'center' },
  icon: {
    paddingLeft: 30,
    paddingRight: 30
  }
});

export default IconMenu;
