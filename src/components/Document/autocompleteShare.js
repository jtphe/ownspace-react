/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Autocomplete from '@shared/Autocomplete';
import showToast from '@utils/showToast';
import i18n from '@i18n/i18n';

/**
 * The AutocompleteShare class component
 * @param {object} users - The users of the group
 * @param {object} usersToIgnore - Array of users to ignore
 * @param {function} addNewUserToDocument - Add the new user to document
 */
class AutocompleteShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this._getUsersWithIgnored(this.props.usersToIgnore),
      query: ''
    };
  }

  /**
   * Returns array of users to select in autocomplete, without the users whose has already been invited
   * or user whose are in the invitation temporary list
   * @param {Object[]} usersToIgnored - Array of users to ignored
   * @return {Object[]} users - Array of users filtered
   */
  _getUsersWithIgnored(usersToIgnored) {
    const users = [];

    for (let i = 0; i < this.props.users.length; i++) {
      const user = this.props.users[i];
      let found = false;
      for (let j = 0; j < usersToIgnored.length; j++) {
        const userToIgnore = usersToIgnored[j].user
          ? usersToIgnored[j].user
          : usersToIgnored[j].id;
        if (userToIgnore === user.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        users.push(user);
      }
    }
    return users;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.usersToIgnore.length !== this.props.usersToIgnore.length) {
      this.setState({
        users: this._getUsersWithIgnored(nextProps.usersToIgnore)
      });
    }
  }

  /**
   * Filter the users array by the query string
   * @param {string} query - The text that is typed in the text input
   * @return {Object[]} Array of users filtered
   */
  _findUser(query) {
    if (query === '') {
      return [];
    }

    const { users } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');

    return users.filter(user => {
      if (user.firstname !== null && user.lastname !== null) {
        return (
          user.firstname.search(regex) >= 0 || user.lastname.search(regex) >= 0
        );
      } else {
        return user.email.search(regex) >= 0;
      }
    });
  }

  /**
   * Add the user to the document
   * @param {Object} user - The user object
   */
  _add(user) {
    if (typeof user === 'object') {
      this.props.addNewUserToDocument(user);
      this.setState({
        query: ''
      });
    } else {
      showToast(i18n.t('shareModal.userNotExist'), true);
      this.setState({
        query: ''
      });
    }
  }

  /**
   * Render the AutocompleteShare class component
   * @returns {React.Component} - AutocompleteShare component
   */
  render() {
    const { query } = this.state;
    const users = this._findUser(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <Autocomplete
        users={users}
        query={query}
        setQuery={user => this.setState({ query: user })}
        comp={(a, b) => comp(a, b)}
        addGuestsList={user => this._add(user)}
      />
    );
  }
}

export default AutocompleteShare;
