/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, StyleSheet, Keyboard, Platform } from 'react-native';
import Header from '@shared/Header/index';
import Text from '@shared/ClientText';
import i18n from '@i18n/i18n';
import { OWNSPACE_LIGHT_GRAY, CLIENT_COLOR_PRIMARY } from '@constants';
import CustomButton from '@shared/CustomButton';
import Autocomplete from './autocompleteShare';
import SharedList from '@components/Document/sharedList';
import InvitedList from '@components/Document/invitedList';
import { addUsersToDocument } from '@store/modules/document/actions';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import showToast from '@utils/showToast';

/**
 * The ShareModal class component
 * @param {Object} document - The document object (file or folder)
 * @param {Object[]} users - The users of the group
 * @param {string} documentType - The type of document
 * @param {boolean} isOwner - If the current user is the owner of the document or not
 * @param {boolean} edit - If the shared user has edit right on the document
 */
class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guestsList: this.props.document.sharedUsers,
      newInvitationsList: [],
      currentRight: i18n.t('shareModal.read'),
      notReadOnly: this.props.shared && !this.props.read
    };
  }

  componentDidUpdate(prevProps) {
    // Check if the user has added a user in the shared's list
    if (prevProps.usersAdded !== this.props.usersAdded) {
      const action = 'add';
      this._renewGuestsList(action);
    }

    // Check if the user has removed a user in the shared's list
    if (prevProps.userRemove !== this.props.userRemove) {
      const action = 'remove';
      this._renewGuestsList(action);
    }
  }

  /**
   * Refresh the user's list for the autocomplete component with the right users
   * @param {string} action - The action did by the user (add or remove)
   */
  _renewGuestsList = action => {
    if (action === 'add') {
      this.setState({
        guestsList: this.state.guestsList.concat(this.props.usersAdded)
      });
    } else {
      this.setState({
        guestsList: this.props.userRemove
      });
    }
  };

  /**
   * Share the document to the users in the newInvitationsList
   */
  _shareDocument = () => {
    if (this.state.newInvitationsList.length > 0) {
      const payload = {
        list: this.state.newInvitationsList,
        document: this.props.document,
        type: this.props.documentType,
        path: this.props.path
      };
      this.props.dispatch(addUsersToDocument(payload));
      this.setState({
        newInvitationsList: []
      });
    } else {
      showToast(i18n.t('shareModal.noUserToShare'), true);
    }
  };

  /**
   * Add the user to the user's list
   * @param {object} user - User object
   */
  _add = user => {
    const oldTmpInvitationsList = [...this.state.newInvitationsList];
    // eslint-disable-next-line no-param-reassign
    user.right = this.state.currentRight;
    oldTmpInvitationsList.push(user);
    Keyboard.dismiss();
    this.setState({
      newInvitationsList: oldTmpInvitationsList
    });
  };

  /**
   * Remove the user from the invitations's list
   * @param {object} invit - The user that should be invited
   */
  _removeInvitationsFromList = invit => {
    const oldTmpInvitationsList = [...this.state.newInvitationsList];
    const idxInvitation = oldTmpInvitationsList.indexOf(invit);

    if (idxInvitation !== -1) {
      oldTmpInvitationsList.splice(idxInvitation, 1);
      this.setState({
        newInvitationsList: oldTmpInvitationsList
      });
    }
  };

  /**
   * Get the dropdown's color according to the user's rights on the document
   */
  _getColor = item => {
    // If user is owner or can edit
    if (this.props.isOwner || this.props.edit) {
      if (item === 'baseColor') {
        return 'rgba(0, 0, 0, .38)';
      } else if (item === 'textColor') {
        return 'rgba(0, 0, 0, .87)';
      } else {
        return 'rgba(0, 0, 0, .54)';
      }
    } else {
      return '#e6e6e6';
    }
  };

  /**
   * Add a style if the user is read only
   */
  _getStyle = () => {
    if (this.props.read) {
      return { marginTop: 12 }
    }
  }

  /**
   * Render the ShareModal class component
   * @returns {React.Component} - ShareModal component
   */
  render() {
    let rights = [];
    if (this.props.isOwner === true || this.props.edit === true) {
      rights = [
        {
          value: i18n.t('shareModal.read')
        },
        {
          value: i18n.t('shareModal.edit')
        }
      ];
    }

    return (
      <View style={styles.globalContainer}>
        <Header />
        <View style={styles.container}>
          {this.props.isOwner || this.state.notReadOnly ?
            <View>
              <Text style={styles.title}>{i18n.t('shareModal.share')}</Text>
              <View style={styles.inputContainer}>
                <Autocomplete
                  users={this.props.users}
                  usersToIgnore={
                    this.state.guestsList !== undefined &&
                      this.state.guestsList.length > 0
                      ? this.state.newInvitationsList.concat(this.state.guestsList)
                      : this.state.newInvitationsList
                  }
                  addNewUserToDocument={user => this._add(user)}
                />
                <Dropdown
                  value={i18n.t('shareModal.read')}
                  onChangeText={right =>
                    this.setState({
                      currentRight: right
                    })
                  }
                  data={rights}
                  containerStyle={
                    Platform.OS === 'ios' ? styles.dropdown : styles.dropdownAndroid
                  }
                  baseColor={this._getColor('baseColor')}
                  textColor={this._getColor('textColor')}
                  itemColor={this._getColor('itemColor')}
                />
              </View>
            </View> : null}
          <View style={[styles.listsContainer, this._getStyle()]}>
            {this.state.guestsList !== undefined ? (
              <SharedList
                guests={this.state.guestsList}
                document={this.props.document.id}
                isOwner={this.props.isOwner}
                edit={this.props.edit}
                user={this.props.user}
              />
            ) : null}
            {this.state.newInvitationsList.length > 0 ? (
              <InvitedList
                invited={this.state.newInvitationsList}
                removeInvitations={invit =>
                  this._removeInvitationsFromList(invit)
                }
              />
            ) : null}
            {this.state.newInvitationsList.length > 0 ? null : (
              <View style={styles.noUsersSharedView}>
                <Text style={styles.noUsersSharedText}>
                  {i18n.t('shareModal.noUsersShared')}
                </Text>
              </View>
            )}
          </View>
        </View>
        <CustomButton confirmFunction={() => this._shareDocument()} readOnly={this.state.readOnly} />
      </View>
    );
  }
}
/**
 * Styles of SharedModal component
 */
const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 35
  },
  title: {
    flexWrap: 'wrap',
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 25,
    fontSize: 26
  },
  inputFileName: {
    fontFamily: 'DejaVuSans',
    color: 'grey',
    backgroundColor: OWNSPACE_LIGHT_GRAY,
    borderRadius: 6,
    padding: 15,
    marginBottom: 25
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100
  },
  listsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 0 : 20
  },
  noUsersSharedView: {
    marginTop: 24,
    padding: 15,
    backgroundColor: CLIENT_COLOR_PRIMARY,
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 5, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 10
  },
  noUsersSharedText: {
    color: 'white'
  },
  dropdown: {
    flex: 1,
    marginTop: -30,
    marginLeft: 14
  },
  dropdownAndroid: {
    flex: 1,
    marginTop: -18,
    marginLeft: 254
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  loadingText: {
    color: CLIENT_COLOR_PRIMARY,
    fontSize: 22
  }
});

export default connect()(ShareModal);
