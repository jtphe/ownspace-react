import React from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@shared/Text';
import i18n from '@i18n/i18n';

/**
 * The autoCompleteIos component
 * @param {Object[]} users - The users of the group
 * @param {string} query - The query typed by the user
 * @param {function} setQuery - The function that set the query typed by the user
 * @param {function} comp - Compare the query typed by the user with the first user in the list
 */
const autoCompleteIos = ({ users, query, setQuery, comp, addGuestsList }) => {
  /**
   * Render the autoCompleteIos class component
   * @returns {React.Component} - autoCompleteIos component
   */
  return (
    <Autocomplete
      data={
        users.length === 1 &&
        comp(
          query,
          users[0].firstname !== null ? users[0].firstname : users[0].email
        )
          ? []
          : users
      }
      defaultValue={query}
      style={styles.inputInvitations}
      inputContainerStyle={styles.autocompleteInputContainer}
      listContainerStyle={styles.listContainerStyle}
      keyboardShouldPersistTaps="always"
      placeholderTextColor="rgba(0, 0, 0, 0.5)"
      placeholder={i18n.t('shareModal.placeholder')}
      onSubmitEditing={guest => addGuestsList(guest.nativeEvent.text)}
      onChangeText={text => setQuery(text)}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => addGuestsList(item)}>
          {item.firstname !== null && item.lastname !== null ? (
            <Text style={styles.userItem}>
              {`${item.firstname} ${item.lastname}`}
            </Text>
          ) : (
            <Text style={styles.userItem}>{`${item.email}`}</Text>
          )}
        </TouchableOpacity>
      )}
    />
  );
};

/**
 * Styles of autoCompleteIos component
 */
const styles = StyleSheet.create({
  inputInvitations: {
    color: '#555',
    fontSize: 16,
    height: 45,
    width: 190,
    marginLeft: 10
  },
  autocompleteInputContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  listContainerStyle: {
    width: '100%',
    marginBottom: 20
  },
  userItem: {
    color: '#555',
    fontSize: 16,
    height: 30,
    marginLeft: 10,
    marginTop: 10
  }
});

autoCompleteIos.defaultProps = {
  users: [],
  query: ''
};

export default autoCompleteIos;
