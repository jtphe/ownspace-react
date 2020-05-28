import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, TextInput } from 'react-native';
import Text from '@shared/Text';
import i18n from '@i18n/i18n';

/**
 * The TotpAuthScreen component
 * @param {function} setToken - Set the token
 * @param {function} verifyTotpToken - Verify the totp token
 */
const TotpAuthScreen = ({ setToken, verifyTotpToken }) => {
  /**
   * Render the TotpAuthScreen component
   * @returns {React.Component} - TotpAuthScreen component
   */
  return (
    <View>
      <Text style={styles.text}>{i18n.t('totp.titleAuth')}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t('totp.placeholder')}
        placeholderTextColor="grey"
        textContentType="number"
        keyboardType="number-pad"
        autoCapitalize="none"
        onChangeText={txt => {
          setToken(txt);
        }}
      />
      <Button
        mode="contained"
        uppercase={false}
        labelStyle={styles.btnText}
        style={styles.btnSignIn}
        onPress={() => {
          verifyTotpToken();
        }}
      >
        {i18n.t('button.validate')}
      </Button>
    </View>
  );
};

/**
 * Styles of TotpAuthScreen component
 */
const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginBottom: 20,
    fontSize: 17,
    opacity: 0.7
  },
  input: {
    height: 50,
    paddingLeft: 15,
    borderColor: 'transparent',
    backgroundColor: '#F7D8D3',
    color: 'grey',
    opacity: 0.7,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 25
  },
  btnSignIn: {
    backgroundColor: '#4788D3',
    padding: 6,
    fontSize: 17,
    fontWeight: 'bold'
  },
  btnText: { fontFamily: 'HelveticaNeueBold', color: '#fff' }
});

export default TotpAuthScreen;
