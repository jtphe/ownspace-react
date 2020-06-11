import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Avatar from '@shared/Avatar';
import Icon from 'react-native-vector-icons/Feather';
import { CLIENT_COLOR_SECONDARY } from '@constants/';

const InvitedList = ({ invited, removeInvitations }) => {
  return (
    <View>
      <FlatList
        style={styles.guestsList}
        data={invited}
        renderItem={({ item }) => (
          <View style={styles.contentContainer}>
            <View style={styles.memberItem}>
              <Avatar
                style={styles.avatarPicture}
                image={item.pictureUrl}
                size={100}
                borderRadius={50}
              />
              {item.firstname !== null && item.lastname !== null ? (
                <Text style={styles.userItem}>
                  {`${item.firstname} ${item.lastname}`}
                </Text>
              ) : (
                <Text style={styles.userItem}>{`${item.email}`}</Text>
              )}
              ƒ
            </View>
            <TouchableOpacity onPress={() => removeInvitations(item)}>
              <Icon size={18} color={CLIENT_COLOR_SECONDARY} name="x" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  guestsList: {
    marginBottom: 20
  },
  contentContainer: {
    borderBottomWidth: 0.7,
    borderBottomColor: '#e8e8e8',
    padding: 10,
    flex: 1,
    flexDirection: 'row'
  },
  memberName: {
    fontSize: 16,
    marginTop: 10,
    flex: 1
  },
  memberItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarImage: {
    width: 25,
    height: 25,
    borderRadius: 12,
    marginRight: 10,
    marginTop: 5
  },
  delete: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 20,
    fontWeight: '500',
    color: '#FF6161'
  },
  userItem: {
    color: '#555',
    fontSize: 16,
    height: 30,
    marginLeft: 10,
    marginTop: 10
  }
});

export default InvitedList;
