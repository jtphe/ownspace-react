import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Header from '@shared/Header/index';
import Text from '@shared/ClientText';
import i18n from '@i18n/i18n';
import { Actions } from 'react-native-router-flux';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { updateUserPassword } from '@store/modules/user/actions';
import showToast from '@utils/showToast';
import { CLIENT_COLOR_PRIMARY, OWNSPACE_GRAY } from '@constants';

/**
 * The PasswordModal component
 * @param {object} user - The user object
 */
const PasswordModal = ({ user }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  /**
   * Update the password
   */
  const updatePassword = () => {
    if (oldPassword !== '' && newPassword !== '' && confirmPassword !== '') {
      if (newPassword === confirmPassword) {
        if (newPassword.length >= 8) {
          const payload = {
            id: user.id,
            oldPassword,
            newPassword
          };
          dispatch(updateUserPassword(payload));
          setNewPassword('');
          setOldPassword('');
          setConfirmPassword('');
        } else {
          showToast(i18n.t('userProfile.error3'), true);
        }
      } else {
        showToast(i18n.t('userProfile.error2'), true);
      }
    } else {
      showToast(i18n.t('userProfile.error1'), true);
    }
  };

  /**
   * Render the PasswordModal component
   * @returns {React.Component} - PasswordModal component
   */
  return (
    <View style={styles.globalContainer}>
      <Header />
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Text style={styles.titleInfo}>
            {i18n.t('userProfile.passwordInfo')}
          </Text>
        </View>
        <Text style={styles.titleInput}>
          {i18n.t('userProfile.oldPassword')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••••••"
          placeholderTextColor="grey"
          selectionColor="grey"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={txt => {
            setOldPassword(txt);
          }}
          autoCapitalize="none"
          value={oldPassword}
          returnKeyType="next"
        />
        <Text style={styles.titleInput}>
          {i18n.t('userProfile.newPassword')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••••••"
          placeholderTextColor="grey"
          selectionColor="grey"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={txt => {
            setNewPassword(txt);
          }}
          autoCapitalize="none"
          value={newPassword}
          returnKeyType="next"
        />
        <Text style={styles.titleInput}>
          {i18n.t('userProfile.confirmNewPassword')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••••••"
          placeholderTextColor="grey"
          selectionColor="grey"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={txt => {
            setConfirmPassword(txt);
          }}
          autoCapitalize="none"
          value={confirmPassword}
          returnKeyType="next"
        />
        <View style={styles.btnContainer}>
          <Button
            mode="contained"
            uppercase={false}
            labelStyle={[styles.btnText, styles.btnTextCancel]}
            contentStyle={styles.btnDimension}
            style={styles.btnCancel}
            onPress={() => Actions.pop()}
          >
            {i18n.t('userProfile.cancel')}
          </Button>
          <Button
            mode="contained"
            uppercase={false}
            labelStyle={styles.btnText}
            contentStyle={styles.btnDimension}
            style={styles.btnUpdate}
            onPress={() => updatePassword()}
          >
            {i18n.t('userProfile.update')}
          </Button>
        </View>
      </View>
    </View>
  );
};

/**
 * Styles of the PasswordModal component
 */
const styles = StyleSheet.create({
  input: {
    fontFamily: 'DejaVuSans',
    color: 'grey',
    backgroundColor: '#DBDBDB',
    borderRadius: 6,
    padding: 15,
    marginBottom: 20,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 5, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 10
  },
  titleInput: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4
  },
  titleInfo: {
    color: 'white'
  },
  containerInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: CLIENT_COLOR_PRIMARY,
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 5, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 10
  },
  container: { flex: 1, paddingHorizontal: 30, marginVertical: 30 },
  btnDimension: {
    height: 45,
    width: 130
  },
  btnText: {
    fontSize: 13,
    fontFamily: 'DejaVuSansBold',
    color: '#fff'
  },
  btnTextCancel: {
    color: CLIENT_COLOR_PRIMARY
  },
  btnCancel: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: CLIENT_COLOR_PRIMARY,
    borderWidth: 1
  },
  btnUpdate: {
    backgroundColor: CLIENT_COLOR_PRIMARY
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  globalContainer: { flex: 1 }
});

export default PasswordModal;
