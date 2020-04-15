import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, TextInput } from 'react-native';
import Text from '@shared/Text';
import i18n from '@i18n/i18n';
import { useFonts } from '@use-expo/font';

const TotpAuthScreen = ({ setToken, verifyTotpToken }) => {
  useFonts({
    // eslint-disable-next-line global-require
    HelveticaNeue: require('../../../assets/fonts/HelveticaNeue.ttf')
  });
  return (
    <View>
      <Text style={styles.text}>{i18n.t('totp.titleAuth')}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t('totp.placeholder')}
        textContentType="password"
        autoCapitalize="none"
        secureTextEntry={true}
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

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginBottom: 20,
    fontSize: 17,
    opacity: 0.7
  },
  input: {
    fontFamily: 'HelveticaNeue',
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
  btnText: { fontFamily: 'HelveticaNeue', color: '#fff' }
});

export default TotpAuthScreen;
