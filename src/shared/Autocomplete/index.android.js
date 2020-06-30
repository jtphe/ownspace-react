import React from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import { Text, View, StyleSheet, Keyboard } from 'react-native';
import i18n from '@i18n/i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * The autoCompleteAndroid component
 * @param {Object[]} users - The users of the group
 * @param {string} query - The query typed by the user
 * @param {function} setQuery - The function that set the query typed by the user
 * @param {function} comp - Compare the query typed by the user with the first user in the list
 */
const autoCompleteAndroid = ({
  users,
  query,
  setQuery,
  comp,
  addGuestsList
}) => {
  /**
   * Render the autoCompleteAndroid class component
   * @returns {React.Component} - autoCompleteAndroid component
   */
  return (
    <View style={styles.autocompleteContainer}>
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
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        placeholder={i18n.t('shareModal.placeholder')}
        onSubmitEditing={guest => addGuestsList(guest.nativeEvent.text)}
        onChangeText={text => setQuery(text)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              addGuestsList(item);
              Keyboard.dismiss();
            }}
          >
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
    </View>
  );
};

/**
 * Styles of autoCompleteAndroid component
 */
const styles = StyleSheet.create({
  autocompleteContainer: {
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: 100
  },
  inputInvitations: {
    color: '#555',
    fontSize: 16,
    height: 45,
    width: 230,
    marginLeft: 10
  },
  autocompleteInputContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  listContainerStyle: {
    width: '108%',
    marginBottom: 20,
    marginLeft: -10,
    zIndex: 100
  },
  userItem: {
    color: '#555',
    fontSize: 16,
    height: 30,
    marginLeft: 10,
    marginTop: 10
  }
});

autoCompleteAndroid.defaultProps = {
  users: [],
  query: ''
};

export default autoCompleteAndroid;
