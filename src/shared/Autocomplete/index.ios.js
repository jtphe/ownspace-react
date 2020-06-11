import React from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from '@i18n/i18n';

const autoCompleteIos = ({ users, query, setQuery, comp, addGuestsList }) => {
  console.log('users ios', users);
  return (
    <Autocomplete
      data={users.length === 1 && comp(query, users[0].firstname) ? [] : users}
      defaultValue={query}
      style={styles.inputInvitations}
      inputContainerStyle={styles.autocompleteInputContainer}
      listContainerStyle={styles.listContainerStyle}
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

const styles = StyleSheet.create({
  inputInvitations: {
    color: '#555',
    fontSize: 16,
    height: 45,
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

export default autoCompleteIos;
