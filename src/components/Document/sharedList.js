import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import i18n from '@i18n/i18n';
import Icon from 'react-native-vector-icons/Feather';
import { CLIENT_COLOR_PRIMARY, CLIENT_COLOR_SECONDARY } from '@constants';
import { useDispatch } from 'react-redux';
import { removeUserFromDocument } from '@store/modules/document/actions';
import Avatar from '@shared/Avatar';

/**
 * The ItemGuest component
 * @param {Object} item - The guest item
 * @param {number} document - Id of the document
 * @param {boolean} isOwner - If the current user is the owner of the document
 * @param {boolean} edit - If the current user has the edit right on the document
 */
const ItemGuest = ({ item, document, isOwner, guests, edit }) => {
  const dispatch = useDispatch();

  /**
   * Remove the user from the document
   */
  const _removeUserFromDocument = () => {
    const payload = {
      user: item.user,
      document,
      guests
    };

    dispatch(removeUserFromDocument(payload));
  };

  /**
   * Render the ItemGuest component
   * @returns {React.Component} - ItemGuest component
   */
  return (
    <View style={styles.contentContainer}>
      <View style={styles.containerAvatar}>
        <Avatar image={item.pictureUrl} size={30} borderRadius={50} />
      </View>
      {item.firstname && item.lastname ? (
        <View style={styles.memberItem}>
          <Text style={styles.memberName}>
            {`${item.firstname} ${item.lastname}`}
          </Text>
        </View>
      ) : (
        <Text style={styles.memberNameEmail}>{item.email}</Text>
      )}
      {isOwner || edit ? (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => _removeUserFromDocument()}
        >
          <Icon size={18} color={CLIENT_COLOR_SECONDARY} name="x" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

/**
 * The SharedList component
 * @param {Object[]} guests - The guests list
 * @param {Object} document - The object document
 * @param {boolean} isOwner - If the current user is the owner of the document
 */
const SharedList = ({ guests, document, isOwner, edit }) => {
  if (guests === null || guests.length === 0) {
    return null;
  }

  /**
   * Render the SharedList component
   * @returns {React.Component} - SharedList component
   */
  return (
    <View style={styles.container}>
      {guests.length >= 1 ? (
        <View style={styles.sharedUsersTitleView}>
          <Icon size={20} color={CLIENT_COLOR_PRIMARY} name="users" />
          <Text style={styles.titleInvites}>
            {i18n.t('shareModal.titleGuest', { count: guests.length })}
          </Text>
        </View>
      ) : null}
      <FlatList
        style={styles.guestsList}
        data={guests}
        keyExtractor={guest => guest.user.toString()}
        renderItem={({ item }) => (
          <ItemGuest
            item={item}
            document={document}
            isOwner={isOwner}
            guests={guests}
            edit={edit}
          />
        )}
      />
    </View>
  );
};

/**
 * Styles of SharedList and ItemGuest components
 */
const styles = StyleSheet.create({
  guestsList: {
    marginBottom: 20
  },
  contentContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: '#e8e8e8',
    paddingLeft: 20,
    paddingRight: 20
  },
  icon: {
    paddingTop: 10
  },
  memberItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  memberName: {
    fontSize: 14,
    marginTop: 10
  },
  memberNameEmail: {
    flex: 1,
    fontSize: 14,
    marginTop: 10,
    marginLeft: 2
  },
  sharedUsersTitleView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleInvites: {
    marginVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: { height: 200 },
  containerAvatar: { marginTop: 8, marginRight: 6 }
});

SharedList.defaultProps = {
  guests: []
};

export default SharedList;
