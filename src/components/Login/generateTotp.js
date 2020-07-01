import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Clipboard, TouchableOpacity } from 'react-native';
import Text from '@shared/Text';
import { Button } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import i18n from '@i18n/i18n';
import showToast from '@utils/showToast';
import { OWNSPACE_BLUE, OWNSPACE_PINK_INPUT } from '@constants';

/**
 * The GenerateTotp component
 * @param {object} user - The user object
 * @param {function} setHasAuthApp - Set the state hasAuthApp to true
 */
const GenerateTotp = ({ user, setHasAuthApp }) => {
  const [copiedText, setCopiedText] = useState('');

  /**
   * Copy the code for the authentication app to the clipboard
   */
  const copyToClipboard = () => {
    Clipboard.setString(copiedText);
    showToast(i18n.t('totp.copied'), true);
  };

  useEffect(() => {
    Auth.setupTOTP(user).then(generatedCode => {
      setCopiedText(generatedCode);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Render GenerateTotp component
   * @returns {React.Component} - GenerateTotp component
   */
  return (
    <View style={styles.container}>
      <Text style={styles.titleCode}>{i18n.t('totp.titleGenerate')}</Text>
      <View style={styles.codeContainer}>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <Text style={styles.code}>{copiedText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.helper}>
        <Text style={styles.helperText}>{i18n.t('totp.copyToClipboard')}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          uppercase={false}
          labelStyle={styles.btnText}
          style={styles.btnNext}
          onPress={() => {
            setHasAuthApp(true);
          }}
        >
          {i18n.t('button.next')}
        </Button>
      </View>
    </View>
  );
};

/**
 * Styles of GenerateTotp component
 */
const styles = StyleSheet.create({
  container: { flexDirection: 'column' },
  codeContainer: {
    marginTop: 24,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: 'transparent',
    backgroundColor: OWNSPACE_PINK_INPUT
  },
  code: { fontSize: 17, color: 'white' },
  titleCode: {
    fontSize: 17,
    color: 'white',
    opacity: 0.8
  },
  helper: {
    marginTop: 10,
    alignItems: 'center'
  },
  helperText: {
    color: 'white',
    opacity: 0.5
  },
  btnNext: {
    backgroundColor: OWNSPACE_BLUE,
    padding: 6,
    paddingLeft: 6,
    paddingRight: 6,
    marginTop: 30
  },
  btnText: { color: '#fff' }
});

export default GenerateTotp;
