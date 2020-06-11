import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import Header from '@shared/Header/index';
import Text from '@shared/ClientText';
import i18n from '@i18n/i18n';
import { OWNSPACE_LIGHT_GRAY } from '@constants';
import CustomButton from '@shared/CustomButton';
import Autocomplete from '@shared/Autocomplete';
import SharedList from '@components/Document/sharedList';
import InvitedList from '@components/Document/invitedList';

const ShareModal = ({ document, users }) => {
  const [usersList, setUserList] = useState(users);
  const [query, setQuery] = useState('');
  const [tmpInvitationsList, setTmpInvitationsList] = useState([]);
  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
  const guestsList = document.sharedList;

  useEffect(() => {
    const usersToReturn = [];
    for (let i = 0; i < users.length; i++) {
      const userInvited = users[i];
      let found = false;
      for (let j = 0; j < guestsList.length; j++) {
        const userInUsersList = guestsList[j];
        if (userInvited.id === userInUsersList.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        users.push(userInvited);
      }
    }
    return usersToReturn;
  }, [usersList]);

  const _shareDocument = () => {
    console.log('I valid the share');
  };

  /**
   *
   * @param {string|Object} user - User object
   */
  const _add = user => {
    const oldTmpInvitationsList = [...tmpInvitationsList];
    const oldUsersList = [...usersList];
    const idxUser = oldUsersList.indexOf(user);
    if (idxUser !== -1) {
      oldUsersList.splice(idxUser, 1);
      setUserList(oldUsersList);
    }
    oldTmpInvitationsList.push(user);
    setTmpInvitationsList(oldTmpInvitationsList);

    setQuery('');
    Keyboard.dismiss();
  };

  const _removeInvitationsFromList = invit => {
    const oldTmpInvitationsList = [...tmpInvitationsList];
    const oldUsersList = [...usersList];
    const idxInvitation = oldTmpInvitationsList.indexOf(invit);

    oldUsersList.push(invit);
    setUserList(oldUsersList);

    if (idxInvitation !== -1) {
      oldTmpInvitationsList.splice(idxInvitation, 1);
      setTmpInvitationsList(oldTmpInvitationsList);
    }
  };

  //   const _usersToIgnore = () => {
  //     const usersToReturn = [];
  //     for (let i = 0; i < users.length; i++) {
  //       const userInvited = users[i];
  //       let found = false;
  //       for (let j = 0; j < guestsList.length; j++) {
  //         const userInUsersList = guestsList[j];
  //         if (userInvited.id === userInUsersList.id) {
  //           found = true;
  //           break;
  //         }
  //       }
  //       if (!found) {
  //         users.push(userInvited);
  //       }
  //     }
  //     return usersToReturn;
  //   };

  return (
    <View style={styles.globalContainer}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>
          {i18n.t('shareModal.shareTitle', { document: document.name })}
        </Text>
        <View style={styles.inputContainer}>
          <Autocomplete
            users={usersList}
            query={query}
            setQuery={user => setQuery(user)}
            comp={(a, b) => comp(a, b)}
            addGuestsList={user => _add(user)}
          />
        </View>
        <View style={styles.listsContainer}>
          {guestsList !== null ? <SharedList guests={guestsList} /> : null}
          <InvitedList
            invited={tmpInvitationsList}
            removeInvitations={invit => _removeInvitationsFromList(invit)}
          />
        </View>
      </View>
      <CustomButton confirmFunction={() => _shareDocument()} />
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  container: {
    paddingLeft: 35,
    paddingRight: 35
  },
  title: {
    flexWrap: 'wrap',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 24
  },
  inputFileName: {
    fontFamily: 'DejaVuSans',
    color: 'grey',
    backgroundColor: OWNSPACE_LIGHT_GRAY,
    borderRadius: 6,
    padding: 15,
    marginBottom: 25
  },
  inputContainer: { flexDirection: 'row' },
  listsContainer: {
    flexDirection: 'column'
  }
});

export default ShareModal;
