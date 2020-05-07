import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Linking,
  TouchableOpacity
} from 'react-native';
import Header from '@shared/Header/withBack';
import Text from '@shared/ClientText';
import i18n from '@i18n/i18n';
import { Actions } from 'react-native-router-flux';
import Avatar from '@shared/Avatar';
import { connect, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { getUser } from '@store/modules/user/selectors';
import { useFonts } from '@use-expo/font';
import { Button } from 'react-native-paper';
import { updateUserNames, signOut } from '@store/modules/user/actions';
import showToast from '@utils/showToast';
import Icon from 'react-native-vector-icons/Feather';

/**
 * Connect to the store and extract data
 */
const mapStateToProps = createSelector(getUser, user => {
  return {
    user
  };
});

/**
 * The UserProfile component
 * @param {object} user - The user object
 */
const UserProfile = ({ user }) => {
  useFonts({
    // eslint-disable-next-line global-require
    DejaVuSans: require('../../../assets/fonts/DejaVuSans.ttf')
  });
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const dispatch = useDispatch();

  /**
   * Update the user firstname and lastname
   */
  const _updateUserProfile = () => {
    if (user.firstname !== '' || user.lastname !== '') {
      if (firstname !== user.firstname || lastname !== user.lastname) {
        const payload = {
          id: user.id,
          firstname,
          lastname
        };
        dispatch(updateUserNames(payload));
      } else {
        showToast(i18n.t('userProfile.nothingToUdpate'), true);
      }
    }
  };

  /**
   * Sign out of the application
   */
  const _signOut = () => {
    Alert.alert(
      i18n.t('userProfile.signOut'),
      i18n.t('userProfile.confirmSignOut'),
      [
        {
          text: i18n.t('userProfile.cancel'),
          style: 'cancel'
        },
        {
          text: i18n.t('userProfile.signOut'),
          onPress: () => dispatch(signOut())
        }
      ]
    );
  };

  /**
   * Open the user mail app
   */
  const _sendEmail = async () => {
    await Linking.openURL('mailto:ownspaceco@gmail.com');
  };

  /**
   * Render the UserProfile component
   * @returns {React.Component} - UserProfile component
   */
  return (
    <View style={styles.container}>
      <Header goTo={() => Actions.home()} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Avatar
            style={styles.avatarPicture}
            image={user.picture}
            size={100}
            borderRadius={50}
          />
        </TouchableOpacity>
        <View>
          {user.firstname !== null && user.lastname !== null ? (
            <Text style={styles.profileName}>
              {`${user.firstname} ${user.lastname}`}
            </Text>
          ) : (
            <Text style={styles.profileName}>{user.email}</Text>
          )}
          <Text style={styles.profileRole}>
            {i18n.t(`userProfile.${user.role}`).toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.containerInfos}>
        <ScrollView>
          <Text style={styles.titleSection}>
            {i18n.t('userProfile.personalInfos')}
          </Text>
          <Text style={styles.titleInput}>
            {i18n.t('userProfile.lastname')}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('userProfile.lastnamePlaceholder')}
            placeholderTextColor="grey"
            textContentType="name"
            selectionColor="grey"
            autoCapitalize="none"
            onChangeText={txt => {
              setLastname(txt);
            }}
            value={lastname}
            returnKeyType="next"
          />
          <Text style={styles.titleInput}>
            {i18n.t('userProfile.firstname')}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('userProfile.firstnamePlaceholder')}
            placeholderTextColor="grey"
            selectionColor="grey"
            textContentType="name"
            onChangeText={txt => {
              setFirstname(txt);
            }}
            value={firstname}
            autoCapitalize="none"
            returnKeyType="next"
          />
          <Text style={styles.titleInput}>{i18n.t('userProfile.email')}</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="grey"
            textContentType="emailAddress"
            autoCapitalize="none"
            value={user.email}
            editable={false}
            returnKeyType="next"
          />
          <View style={styles.separator} />
          <Text style={styles.titleSection}>
            {i18n.t('userProfile.securityPrivacy')}
          </Text>
          <TouchableOpacity
            style={styles.settingOption}
            onPress={() => Actions.passwordModal({ user })}
          >
            <Icon name="lock" size={18} />
            <Text style={styles.textSetting}>
              {i18n.t('userProfile.updatePassword')}
            </Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              uppercase={false}
              labelStyle={styles.btnText}
              contentStyle={styles.btnDimension}
              style={styles.btnLogOut}
              onPress={() => _signOut()}
            >
              {i18n.t('userProfile.signOut')}
            </Button>
            <Button
              mode="contained"
              uppercase={false}
              labelStyle={styles.btnText}
              contentStyle={styles.btnDimension}
              style={styles.btnEdit}
              onPress={() => _updateUserProfile()}
            >
              {i18n.t('userProfile.edit')}
            </Button>
          </View>
          <TouchableOpacity
            style={styles.helpContainer}
            onPress={() => _sendEmail()}
          >
            <Text style={styles.helpText}>{i18n.t('userProfile.help')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

/**
 * Styles of the UserProfile component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24
  },
  avatarPicture: {
    backgroundColor: '#FF6161'
  },
  avatarContainer: { marginBottom: 20 },
  profileName: {
    fontSize: 18,
    color: '#003466',
    marginBottom: 8
  },
  profileRole: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  },
  titleInput: { fontSize: 14, fontWeight: '800', marginBottom: 4 },
  input: {
    fontFamily: 'DejaVuSans',
    backgroundColor: '#DBDBDB',
    fontSize: 12,
    borderRadius: 6,
    paddingVertical: 15,
    paddingLeft: 8,
    marginBottom: 20,
    shadowColor: 'rgba(0,0,0,.04)',
    shadowOffset: { width: 5, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 10
  },
  containerInfos: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#003466',
    paddingHorizontal: 45,
    paddingVertical: 20
  },
  btnDimension: {
    height: 45,
    width: 130
  },
  btnText: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'DejaVuSans',
    color: '#fff'
  },
  btnLogOut: {
    backgroundColor: '#E30043',
    color: '#42688B'
  },
  btnEdit: {
    backgroundColor: '#003466',
    borderColor: 'black'
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 30,
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  helpText: {
    fontSize: 18,
    color: '#003466',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  titleSection: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
  separator: {
    borderBottomWidth: 3,
    borderRadius: 8,
    borderColor: '#003466',
    marginBottom: 20
  },
  settingOption: { flexDirection: 'row' },
  textSetting: { marginLeft: 10, alignSelf: 'center' }
});

export default connect(mapStateToProps)(UserProfile);
