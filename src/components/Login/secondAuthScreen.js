/* eslint-disable global-require */
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, TextInput, ImageBackground } from 'react-native';
import Text from '@shared/Text';
import Logo from '@shared/Logo/index';
import GenerateTotp from '@components/Login/generateTotp';
import { Auth } from 'aws-amplify';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Actions } from 'react-native-router-flux';
import TotpAuthScreen from './totpAuthScreen';
import i18n from '@i18n/i18n';
import { useFonts } from '@use-expo/font';
import { useDispatch } from 'react-redux';
import { createUser } from '@store/modules/user/actions';
import { ROLE_ONE, ROLE_TWO, RECURRING_ROLE } from '@constants';
import showToast from '@utils/showToast';

const RenewPwdScreen = ({ pwd, setNewPasswordRequired, confirmNewPwd }) => {
  useFonts({
    // eslint-disable-next-line global-require
    HelveticaNeue: require('../../../assets/fonts/HelveticaNeue.ttf')
  });

  return (
    <View>
      <Text style={styles.text}>{i18n.t('newPassword.title')}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t('newPassword.placeholder')}
        textContentType="password"
        autoCapitalize="none"
        secureTextEntry={true}
        value={pwd}
        onChangeText={txt => {
          setNewPasswordRequired(txt);
        }}
      />
      <Button
        mode="contained"
        uppercase={false}
        labelStyle={styles.btnText}
        style={styles.btnSignIn}
        onPress={() => {
          confirmNewPwd();
        }}
      >
        {i18n.t('button.validate')}
      </Button>
    </View>
  );
};

const SecondAuthScreen = ({ user }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRequired, setNewPasswordRequired] = useState(
    user.challengeName === 'NEW_PASSWORD_REQUIRED'
  );
  const [hasAuthApp, setHasAuthApp] = useState(
    user.challengeName === 'SOFTWARE_TOKEN_MFA'
  );

  /**
   * Confirm the new password
   */
  const confirmNewPwd = async () => {
    if (newPassword.trim().length >= 8) {
      await Auth.completeNewPassword(user, newPassword);
      setNewPasswordRequired(false);
    } else {
      showToast(i18n.t('newPassword.lengthError'), true);
    }
  };

  /**
   * Create the user to add to the DynamoDB
   */
  const createUserObject = async () => {
    await Auth.currentUserInfo().then(userInfo => {
      let role = '';
      if (userInfo.attributes.email.substr(0, 6) === RECURRING_ROLE) {
        role = ROLE_ONE;
      } else {
        role = ROLE_TWO;
      }
      const payload = {
        id: userInfo.attributes.sub,
        email: userInfo.attributes.email,
        password: newPassword !== '' ? newPassword : 'password',
        role
      };
      dispatch(createUser(payload));
    });
  };

  /**
   * Check if the token is correct
   */
  const verifyTotpToken = async () => {
    try {
      if (user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        const loggedUser = await Auth.confirmSignIn(
          user,
          token,
          'SOFTWARE_TOKEN_MFA'
        );
        const isLoggedIn = true;
        Actions.home({ loggedUser, isLoggedIn });
      } else {
        try {
          await Auth.verifyTotpToken(user, token).then(() => {
            Auth.setPreferredMFA(user, 'TOTP').then(data => {
              if (data === 'SUCCESS') {
                createUserObject();
              }
            });
          });
        } catch (e) {
          showToast(i18n.t('totp.invalidToken'), true);
          console.log('Token is not verified =>', e);
        }
      }
    } catch (err) {
      if (err.code === 'UserNotConfirmedException') {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
      } else if (err.code === 'PasswordResetRequiredException') {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
      } else if (err.code === 'NotAuthorizedException') {
        // The error happens when the incorrect password is provided
      } else if (err.code === 'UserNotFoundException') {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
      } else {
        showToast(i18n.t('totp.invalidToken'), true);
        console.log(err);
      }
    }
  };

  return (
    <ImageBackground
      source={require('@images/background_authentication.png')}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.companyName}>{i18n.t('loginPage.ownspace')}</Text>
        <Text style={styles.welcomeTitle}>
          {i18n.t('loginPage.almostDone')}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        {newPasswordRequired ? (
          <RenewPwdScreen
            pwd={newPassword}
            setNewPasswordRequired={pwd => setNewPassword(pwd)}
            confirmNewPwd={() => confirmNewPwd()}
          />
        ) : (
          <View>
            {hasAuthApp ? (
              <TotpAuthScreen
                setToken={tkn => setToken(tkn)}
                verifyTotpToken={() => verifyTotpToken()}
              />
            ) : (
              <GenerateTotp
                user={user}
                setHasAuthApp={value => setHasAuthApp(value)}
              />
            )}
          </View>
        )}
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
    backgroundColor: '#F7D8D3',
    color: 'grey',
    opacity: 0.7,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 25
  },
  text: {
    color: 'white',
    marginBottom: 20,
    fontSize: 17,
    opacity: 0.7
  },
  btnSignIn: {
    backgroundColor: '#4788D3',
    padding: 6,
    fontSize: 17,
    fontWeight: 'bold'
  },
  logo: { flex: 1, flexDirection: 'column', justifyContent: 'flex-end' },
  btnText: { color: 'white', fontFamily: 'HelveticaNeue' }
});

export default SecondAuthScreen;
