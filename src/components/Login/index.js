/* eslint-disable global-require */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
  Keyboard,
  ImageBackground
} from 'react-native';
import Logo from '../../shared/Logo/index';
import { Auth } from 'aws-amplify';
import { Actions } from 'react-native-router-flux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import i18n from '@i18n/i18n';
import Text from '@shared/Text';
import { useFonts } from '@use-expo/font';
import showToast from '@utils/showToast';

const Login = () => {
  useFonts({
    // eslint-disable-next-line global-require
    HelveticaNeue: require('../../../assets/fonts/HelveticaNeue.ttf')
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Check if the email is valid or not
   */
  const _validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  /**
   * Sign in to the app
   */
  const signIn = async () => {
    if (_validateEmail() && password.trim().length >= 8) {
      await Auth.signIn({
        username: email,
        password
      })
        .then(user => {
          console.log('successful sign in !');
          Actions.twoFactor({ user });
        })
        .catch(err => {
          showToast(i18n.t('loginPage.wrongPassword'), true);
          console.log('error while signing in =>', err);
        });
    } else {
      showToast(i18n.t('loginPage.invalidPasswordEmail'), true);
    }
  };

  /**
   * Open the user mail app
   */
  const sendEmail = async () => {
    await Linking.openURL('mailto:ownspaceco@gmail.com');
  };

  return (
    <ImageBackground
      source={require('@images/background_authentication.png')}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.companyName}>{i18n.t('loginPage.ownspace')}</Text>
        <Text style={styles.welcomeTitle}>{i18n.t('loginPage.welcome')}</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('loginPage.email')}
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={txt => {
              setEmail(txt);
            }}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordTextInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={input => {
              passwordTextInput = input;
            }}
            style={styles.input}
            placeholder={i18n.t('loginPage.password')}
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={txt => {
              setPassword(txt);
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          uppercase={false}
          labelStyle={styles.btnText}
          style={styles.btnSignIn}
          onPress={() => {
            signIn();
          }}
        >
          {i18n.t('loginPage.login')}
        </Button>
        <TouchableOpacity
          style={styles.containerHelp}
          onPress={() => sendEmail()}
        >
          <Text style={styles.btnHelp}>{i18n.t('loginPage.needHelp')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logo}>
        <Logo />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 50,
    paddingRight: 50
  },
  headerContainer: {
    backgroundColor: 'blue',
    paddingTop: 120,
    paddingBottom: 50
  },
  header: {
    ...ifIphoneX(
      {
        paddingTop: 100,
        paddingBottom: 70
      },
      {
        paddingTop: 60,
        paddingBottom: 40
      }
    )
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: 48,
    color: 'white'
  },
  welcomeTitle: {
    fontSize: 24,
    color: 'white',
    opacity: 0.4
  },
  textInputContainer: {
    paddingTop: 20
  },
  input: {
    height: 50,
    paddingLeft: 15,
    fontFamily: 'HelveticaNeue',
    borderColor: 'transparent',
    backgroundColor: '#F7D8D3',
    color: 'grey',
    opacity: 0.7,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 25
  },
  buttonContainer: { flexDirection: 'row' },
  btnSignIn: {
    backgroundColor: '#4788D3',
    padding: 6,
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 17,
    fontWeight: 'bold'
  },
  containerHelp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnHelp: {
    fontWeight: '500',
    color: 'white'
  },
  logo: { flex: 1, flexDirection: 'column', justifyContent: 'flex-end' },
  btnText: { fontFamily: 'HelveticaNeue', color: '#fff' }
});

export default Login;
