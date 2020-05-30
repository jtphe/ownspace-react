import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import Text from '@shared/Text';
import i18n from '@i18n/i18n';
import { OWNSPACE_BLUE, OWNSPACE_PINK_INPUT, OWNSPACE_GRAY } from '@constants';
import showToast from '@utils/showToast';
import { updateUserForgottenPassword } from '@store/modules/user/actions';

/**
 * The ForgottenPasswordModal component
 * @param {function} setForgottenPassword - Set the visibility of the modal
 * @param {string} username - The user email indeed
 * @param {function} setEmail - Set the user email
 */
const ForgottenPasswordModal = ({
  setForgottenPassword,
  username,
  setEmail
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();

  /**
   * Check if the verification code is correct and update the user password
   */
  const _checkVerificationCode = () => {
    if (verificationCode.trim().length > 0 && newPassword.trim().length > 8) {
      Auth.forgotPasswordSubmit(username, verificationCode, newPassword)
        .then(() => {
          setForgottenPassword(false);
          setEmail('');
          showToast(i18n.t('loginPage.passwordUpdated'), true);
          const payload = {
            email: username,
            newPassword
          };
          dispatch(updateUserForgottenPassword(payload));
        })
        .catch(err => {
          showToast(i18n.t('loginPage.wrongVerificationCode'), true);
          console.log(err);
        });
    } else {
      showToast(i18n.t('document.noEmpty'), true);
    }
  };

  /**
   * Render the ForgottenPasswordModal component
   * @returns {React.Component} - ForgottenPasswordModal component
   */
  return (
    <View>
      <Text style={styles.text}>{i18n.t('loginPage.titleForgottenPwd')}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t('loginPage.placeholderCode')}
        placeholderTextColor="grey"
        keyboardType="number-pad"
        autoCapitalize="none"
        onChangeText={txt => {
          setVerificationCode(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder={i18n.t('loginPage.newPassword')}
        placeholderTextColor="grey"
        textContentType="password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={txt => {
          setNewPassword(txt);
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          uppercase={false}
          labelStyle={styles.btnTextCancel}
          style={styles.btnCancel}
          onPress={() => {
            setForgottenPassword(false);
            setEmail('');
          }}
        >
          {i18n.t('button.cancel')}
        </Button>
        <Button
          mode="contained"
          uppercase={false}
          labelStyle={styles.btnText}
          style={styles.btnValid}
          onPress={() => _checkVerificationCode()}
        >
          {i18n.t('button.validate')}
        </Button>
      </View>
    </View>
  );
};

/**
 * Styles of ForgottenPasswordModal component
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
    backgroundColor: OWNSPACE_PINK_INPUT,
    color: OWNSPACE_GRAY,
    opacity: 0.7,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 25
  },
  btnValid: {
    backgroundColor: OWNSPACE_BLUE,
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontSize: 17,
    fontWeight: 'bold'
  },
  btnCancel: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: OWNSPACE_GRAY,
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  btnText: { color: '#fff' },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnTextCancel: {
    color: OWNSPACE_GRAY,
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default ForgottenPasswordModal;
