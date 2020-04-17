import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Clipboard } from 'react-native';
import { Button } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import i18n from '@i18n/i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import showToast from '@utils/showToast';

const GenerateTotp = ({ user, setHasAuthApp }) => {
  const [copiedText, setCopiedText] = useState('');

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
          labelStyle={styles.btnColor}
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

const styles = StyleSheet.create({
  container: { flexDirection: 'column' },
  codeContainer: {
    marginTop: 24,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: 'transparent',
    backgroundColor: '#F7D8D3'
  },
  code: { fontSize: 17, color: 'white' },
  titleCode: {
    fontSize: 17,
    color: 'white'
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
    backgroundColor: '#4788D3',
    padding: 6,
    paddingLeft: 6,
    paddingRight: 6,
    marginTop: 30,
    fontSize: 17,
    fontWeight: 'bold'
  },
  btncolor: { color: '#fff' }
});

export default GenerateTotp;
