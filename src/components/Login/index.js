/* eslint-disable global-require */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  ImageBackground
} from 'react-native';
import Logo from '@shared/Logo/index';
import { Auth } from 'aws-amplify';
import { Actions } from 'react-native-router-flux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import i18n from '@i18n/i18n';
import Text from '@shared/Text';
import showToast from '@utils/showToast';
import { useDispatch } from 'react-redux';
import { resetAllStore } from '@store/modules/app/actions';
import { OWNSPACE_PINK_INPUT, OWNSPACE_BLUE } from '@constants';
import ForgottenPasswordModal from './forgottenPasswordModal';
import _validateEmail from '@utils/validateEmail';

/**
 * The Login component
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgottenPassword, setForgottenPassword] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAllStore());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Sign in to the app
   */
  const _signIn = async () => {
    if (_validateEmail(email) && password.trim().length >= 8) {
      await Auth.signIn({
        username: email,
        password
      })
        .then(user => {
          console.log('successful sign in !');
          Actions.twoFactor({ user });
        })
        .catch(err => {
          showToast(i18n.t('loginPage.invalidPasswordEmail'), true);
          console.log('error while signing in =>', err);
        });
    } else {
      showToast(i18n.t('loginPage.wrongPassword'), true);
    }
  };

  /**
   * Send password instructions for the forgotten password
   */
  const _sendPasswordInstructions = async () => {
    if (email.length > 0) {
      if (_validateEmail(email)) {
        Auth.forgotPassword(email)
          .then(data => {
            console.log('data', data);
            showToast(i18n.t('loginPage.passwordInstructions'), true);
            setForgottenPassword(true);
          })
          .catch(err => console.log(err));
      } else {
        showToast(i18n.t('loginPage.invalidEmail'), true);
      }
    } else {
      showToast(i18n.t('loginPage.needEmail'), true);
    }
  };

  /**
   * Render the Login component
   * @returns {React.Component} - Login component
   */
  return (
    <ImageBackground
      source={require('@images/background_authentication.png')}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.companyName}>{i18n.t('loginPage.ownspace')}</Text>
        <Text style={styles.welcomeTitle}>{i18n.t('loginPage.welcome')}</Text>
      </View>
      {!forgottenPassword ? (
        <View>
          <View style={styles.textInputContainer}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <TextInput
                style={styles.input}
                placeholder={i18n.t('loginPage.email')}
                placeholderTextColor="grey"
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
                placeholderTextColor="grey"
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
                _signIn();
              }}
            >
              {i18n.t('loginPage.login')}
            </Button>
            <TouchableOpacity
              style={styles.containerHelp}
              onPress={() => _sendPasswordInstructions()}
            >
              <Text style={styles.btnForgottenPwd}>
                {i18n.t('loginPage.forgottenPassword')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ForgottenPasswordModal
          setForgottenPassword={value => setForgottenPassword(value)}
          username={email}
          setEmail={value => setEmail(value)}
        />
      )}
      <View style={styles.logo}>
        <Logo />
      </View>
    </ImageBackground>
  );
};

/**
 * Styles of Login component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 50,
    paddingRight: 50
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
    borderColor: 'transparent',
    backgroundColor: OWNSPACE_PINK_INPUT,
    color: 'grey',
    opacity: 0.7,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 25
  },
  buttonContainer: { flexDirection: 'row' },
  btnSignIn: {
    backgroundColor: OWNSPACE_BLUE,
    padding: 4,
    fontSize: 17,
    fontWeight: 'bold'
  },
  containerHelp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnForgottenPwd: {
    color: 'white',
    textDecorationLine: 'underline'
  },
  logo: { flex: 1, flexDirection: 'column', justifyContent: 'flex-end' },
  btnText: { color: '#fff' }
});

export default Login;
