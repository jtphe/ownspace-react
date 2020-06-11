import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import i18n from '@i18n/i18n';
import Avatar from '@shared/Avatar';

const ItemGuest = ({ item }) => {
  const { user } = item;

  return (
    <View style={styles.contentContainer}>
      {user ? (
        <View style={styles.memberItem}>
          <Avatar
            style={styles.avatarPicture}
            image={user.pictureUrl}
            size={100}
            borderRadius={50}
          />
          <Text style={styles.memberName}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
        </View>
      ) : (
        <Text style={styles.memberNameEmail}>{item.email}</Text>
      )}
    </View>
  );
};

const SharedList = ({ guests }) => {
  if (guests === null || guests.length === 0) {
    return null;
  }
  return (
    <View>
      {guests.length > 1 ? (
        <Text style={styles.titleInvites}>
          {`${i18n.t('addEvent.titleInvitesPlu')} (${guests.length})`}
        </Text>
      ) : (
        <Text style={styles.titleInvites}>
          {`${i18n.t('addEvent.titleInvitesSing')} (${guests.length})`}
        </Text>
      )}
      <FlatList
        style={styles.guestsList}
        data={guests}
        keyExtractor={guest => guest.id.toString()}
        renderItem={({ item }) => <ItemGuest item={item} />}
      />
    </View>
  );
};

SharedList.defaultProps = {
  guests: []
};

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
  avatarImage: {
    width: 25,
    height: 25,
    borderRadius: 12,
    marginRight: 10,
    marginTop: 5
  },
  userRow: {
    flexDirection: 'row'
  },
  titleInvites: {
    fontWeight: '500',
    marginLeft: 18,
    marginTop: 20,
    fontSize: 14
  },
  avatarPicture: {
    backgroundColor: '#FF6161'
  }
});

export default SharedList;
