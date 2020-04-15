import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DotIcon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';

const IconMenu = ({ name, size, selected, setSelected }) => {
  /**
   * Get the color of the icon
   */
  const getColor = () => {
    if (selected) {
      return '#E30043';
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

  return (
    <View style={[styles.containerIcon, getStyle()]}>
      <TouchableOpacity onPress={() => setSelected(name)}>
        <Icon style={styles.icon} name={name} size={size} color={getColor()} />
      </TouchableOpacity>
      {selected ? (
        <DotIcon name="dot-single" size={20} color="#E30043" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  containerIcon: { flexDirection: 'column', alignItems: 'center' },
  icon: {
    paddingLeft: 30,
    paddingRight: 30
  }
});

export default IconMenu;
