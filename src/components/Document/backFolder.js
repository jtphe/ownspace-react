import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from '@shared/ClientText';
import Icon from 'react-native-vector-icons/Feather';

/**
 * The BackFolder component
 * @param {function} backAction - The function to start when user go back
 * @param {boolean} visible - Tell if the BackFolder component is visible or not
 * @param {string} name - The name of the previous folder
 */
const BackFolder = ({ backAction, visible, name }) => {
  if (visible) {
    /**
     * Render the BackFolder component
     * @returns {React.Component} - BackFolder component
     */
    return (
      <TouchableWithoutFeedback onPress={() => backAction()}>
        <View style={styles.backContainer}>
          <Icon size={18} color="#003466" name="arrow-left" />
          <View style={styles.backTitle}>
            <Text style={styles.backText}>{name}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return null;
};

/**
 * Styles of BackFolder component
 */
const styles = StyleSheet.create({
  backContainer: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center'
  },
  backTitle: {
    marginLeft: 7
  },
  backText: {
    fontWeight: '900',
    color: '#555459',
    fontSize: 16
  }
});

export default BackFolder;
