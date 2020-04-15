import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import i18n from '@i18n/i18n';

const CustomButton = ({ confirmFunction }) => {
  return (
    <View style={styles.btnContainer}>
      <Button
        mode="contained"
        uppercase={false}
        labelStyle={styles.cancelColor}
        contentStyle={styles.btnDimension}
        style={styles.btnCancel}
        onPress={() => Actions.pop()}
      >
        {i18n.t('button.cancel')}
      </Button>
      <Button
        mode="contained"
        uppercase={false}
        labelStyle={styles.confirmColor}
        contentStyle={styles.btnDimension}
        style={styles.btnConfirm}
        onPress={() => confirmFunction()}
      >
        {i18n.t('button.validate')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    padding: 35,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  btnCancel: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#003466',
    borderWidth: 1,
    color: '#42688B'
  },
  btnConfirm: {
    justifyContent: 'center',
    backgroundColor: '#003466',
    borderColor: 'black'
  },
  btnDimension: {
    height: 45,
    width: 100
  },
  cancelColor: { color: '#42688B' },
  confirmColor: { color: '#fff' }
});

export default CustomButton;
