import React from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from '@i18n/i18n';

const autoCompleteAndroid = ({
  users,
  query,
  setQuery,
  comp,
  addGuestsList
}) => {
  return (
    <View style={styles.autocompleteContainer}>
      <Autocomplete
        data={
          users.length === 1 && comp(query, users[0].firstName) ? [] : users
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
    </View>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    left: 0,
    right: 0,
    bottom: 0
  },
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
    width: '105%',
    marginBottom: 20,
    marginLeft: -10
  },
  userItem: {
    color: '#555',
    fontSize: 16,
    height: 30,
    marginLeft: 10,
    marginTop: 10
  }
});

export default autoCompleteAndroid;
