import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Text from '@shared/Text';
import Icon from 'react-native-vector-icons/Feather';
import { CLIENT_COLOR_SECONDARY, CLIENT_COLOR_PRIMARY } from '@constants';
import i18n from '@i18n/i18n';

/**
 * The InvitedList component
 * @param {Object} invited - The invited list of user
 * @param {function} removeInvitations - Remove the user from the invited list
 */
const InvitedList = ({ invited, removeInvitations }) => {
  if (invited === null || invited.length === 0) {
    return null;
  }

  /**
   * Render the InvitedList component
   * @returns {React.Component} - InvitedList component
   */
  return (
    <View style={styles.container}>
      <View style={styles.invitationTitleView}>
        <Icon size={20} color={CLIENT_COLOR_PRIMARY} name="send" />
        <Text style={styles.invitationTitleText}>
          {i18n.t('shareModal.invitationTitle', { count: invited.length })}
        </Text>
      </View>
      <FlatList
        style={styles.guestsList}
        data={invited}
        renderItem={({ item }) => (
          <View style={styles.contentContainer}>
            {item.firstname !== null && item.lastname !== null ? (
              <View style={styles.memberItem}>
                <Text style={styles.memberName}>
                  {`${item.firstname} ${item.lastname}`}
                </Text>
              </View>
            ) : (
              <Text style={styles.memberNameEmail}>{item.email}</Text>
            )}
            <TouchableOpacity
              style={styles.icon}
              onPress={() => removeInvitations(item)}
            >
              <Icon size={18} color={CLIENT_COLOR_SECONDARY} name="x" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

/**
 * Styles of InvitedList component
 */
const styles = StyleSheet.create({
  container: { paddingTop: 20, height: 250 },
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
  delete: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 20,
    fontWeight: '500',
    color: CLIENT_COLOR_SECONDARY
  },
  userItem: {
    color: '#555',
    fontSize: 16,
    height: 30,
    marginLeft: 10,
    marginTop: 10
  },
  icon: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  invitationTitleView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  invitationTitleText: {
    marginVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default InvitedList;
