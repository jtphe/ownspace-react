import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Text from '@shared/ClientText';
import FolderIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import formatDate from '@utils/formatDate';
import {
  loadFolders,
  loadFiles,
  // deleteDocument,
  addPasswordFolder,
  checkFolderPassword,
  removePasswordFolder
} from '@store/modules/document/actions';
import IconOptions from 'react-native-vector-icons/Entypo';
import i18n from '@i18n/i18n';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import OwnSpaceDialog from '@shared/Dialog';
import showToast from '@utils/showToast';
import {
  CLIENT_COLOR_PRIMARY,
  OWNSPACE_GRAY,
  OWNSPACE_LIGHT_GRAY
} from '@constants';
import { Actions } from 'react-native-router-flux';

/**
 * Animation that makes slide in the menu from the bottom of the screen.
 */
const { SlideInMenu } = renderers;

/**
 * The Folder component
 * @param {object} folder - The folder
 * @param {object} user - The user
 */
const Folder = ({ folder, user, groupUsers }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);
  const isOwner = folder.owner === user.id;
  const { isProtected, edit, shared, owner } = folder;

  /**
   * Open the folder
   */
  const _openFolder = () => {
    if (folder.isProtected) {
      _showPasswordFolderEntry();
    } else {
      dispatch(loadFolders(folder));
      dispatch(loadFiles(folder));
    }
  };

  /**
   * Show the password modal that protect the folder
   */
  const _showPasswordFolderEntry = () => {
    setPasswordCheckVisible(true);
  };

  // /**
  //  * Show the alert to delete the folder
  //  */
  // const _showAlertDeleteFolder = () => {
  //   Alert.alert(
  //     i18n.t('document.deleteFolder'),
  //     i18n.t('document.confirmDeleteFolder', { folder: folder.name }),
  //     [
  //       {
  //         text: i18n.t('button.cancel'),
  //         style: 'cancel'
  //       },
  //       {
  //         text: i18n.t('button.delete'),
  //         onPress: () => {
  //           if (!folder.isProtected) {
  //             const payload = {
  //               pathId: folder.id,
  //               name: folder.name,
  //               nbFiles: folder.nbFiles
  //             };
  //             dispatch(deleteDocument(payload));
  //           } else {
  //             // TODO: Add the modal to enter password
  //           }
  //         }
  //       }
  //     ]
  //   );
  // };

  /**
   * Show the modal to add a password to the folder
   */
  const _showPasswordModal = () => {
    setVisible(true);
  };

  /**
   * Hide the modal to add a password to the folder
   */
  const _hidePasswordModal = () => {
    setPassword('');
    setVisible(false);
  };

  /**
   * Hide the modal that protect the folder opening
   */
  const _hidePasswordCheckModal = () => {
    setPassword('');
    setPasswordCheckVisible(false);
  };

  /**
   * Check if the folder password is good
   */
  const _checkPassword = () => {
    if (password.length > 0) {
      const payload = {
        password,
        folder
      };
      dispatch(checkFolderPassword(payload));
      _hidePasswordCheckModal();
    }
  };

  /**
   * Add a password to a folder
   */
  const _addPassword = () => {
    if (password.trim().length > 0) {
      if (password.trim().length >= 8) {
        const payload = {
          id: folder.id,
          password
        };
        dispatch(addPasswordFolder(payload));
        setPassword('');
        _hidePasswordModal();
      } else {
        showToast(i18n.t('userProfile.error3'), true);
      }
    } else {
      showToast(i18n.t('userProfile.error1'), true);
    }
  };

  /**
   * Remove a password from a folder
   */
  const _removePasswordFolder = () => {
    Alert.alert(
      i18n.t('document.removePassword', { folder: folder.name }),
      i18n.t('document.confirmRemovePassword', { folder: folder.name }),
      [
        {
          text: i18n.t('button.cancel'),
          style: 'cancel'
        },
        {
          text: i18n.t('button.remove'),
          onPress: () => {
            const payload = {
              id: folder.id
            };
            dispatch(removePasswordFolder(payload));
          }
        }
      ]
    );
  };

  /**
   * Render the Folder component
   * @returns {React.Component} - Folder component
   */
  return (
    <View stye={styles.container}>
      <View style={styles.rowFolder}>
        <TouchableOpacity onPress={() => _openFolder()}>
          <View style={styles.folderContainer}>
            <FolderIcon size={36} color={CLIENT_COLOR_PRIMARY} name="folder" />
            <View style={styles.folderItem}>
              <Text
                style={styles.folderName}
                numberOfLine={1}
                ellipsizeMode="middle"
              >
                {folder.name}
              </Text>
              <Text style={styles.folderDate}>{formatDate(folder)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.containerMenu}>
          <Menu renderer={SlideInMenu}>
            <MenuTrigger>
              <IconOptions
                name="dots-three-horizontal"
                size={20}
                color={OWNSPACE_GRAY}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16
                },
                optionsWrapper: {
                  ...ifIphoneX(
                    {
                      paddingBottom: 30
                    },
                    {
                      paddingBottom: 10
                    }
                  ),
                  paddingTop: 10
                }
              }}
            >
              <View>
                <MenuOption
                  customStyles={{
                    optionWrapper: styles.menuOptions
                  }}
                  value={1}
                  onSelect={() =>
                    Actions.shareModal({
                      document: folder,
                      users: groupUsers,
                      documentType: 'folder',
                      isOwner,
                      edit
                    })
                  }
                >
                  <View style={styles.options}>
                    <Icon
                      name="user-plus"
                      size={25}
                      color={CLIENT_COLOR_PRIMARY}
                    />
                    <Text style={styles.textMenuOptions}>
                      {i18n.t('document.share')}
                    </Text>
                  </View>
                </MenuOption>
                {isOwner || edit ? (
                  <MenuOption
                    customStyles={{
                      optionWrapper: isProtected
                        ? styles.menuOptions
                        : styles.menuOptionsLast
                    }}
                    value={2}
                    onSelect={() => _showPasswordModal()}
                  >
                    <View style={styles.options}>
                      <Icon
                        name="lock"
                        size={25}
                        color={CLIENT_COLOR_PRIMARY}
                      />
                      <Text style={styles.textMenuOptions}>
                        {i18n.t('document.protect')}
                      </Text>
                    </View>
                  </MenuOption>
                ) : null}
                {isProtected && (isOwner || edit) ? (
                  <MenuOption
                    customStyles={{
                      optionWrapper: styles.menuOptionsLast
                    }}
                    value={3}
                    onSelect={() => _removePasswordFolder()}
                  >
                    <View style={styles.options}>
                      <Icon
                        name="unlock"
                        size={25}
                        color={CLIENT_COLOR_PRIMARY}
                      />
                      <Text style={styles.textMenuOptions}>
                        {i18n.t('document.unprotect')}
                      </Text>
                    </View>
                  </MenuOption>
                ) : null}
                {/* <MenuOption
                  customStyles={{
                    optionWrapper: styles.menuOptions
                  }}
                  value={4}
                  onSelect={() => console.log('folder', folder)}
                >
                  <View style={styles.options}>
                    <Icon name="edit" size={25} color={CLIENT_COLOR_PRIMARY} />
                    <Text style={styles.textMenuOptions}>
                      {i18n.t('document.renameFolder')}
                    </Text>
                  </View>
                </MenuOption> */}
                {/* <MenuOption
                  customStyles={{
                    optionWrapper: styles.menuOptionsLast
                  }}
                  value={5}
                  onSelect={() => _showAlertDeleteFolder()}
                >
                  <View style={styles.options}>
                    <Icon name="trash" size={25} color={CLIENT_COLOR_PRIMARY} />
                    <Text style={styles.textMenuOptions}>
                      {i18n.t('document.deleteFolder')}
                    </Text>
                  </View>
                </MenuOption> */}
              </View>
            </MenuOptions>
          </Menu>
        </View>
      </View>
      <View style={styles.separator} />
      <OwnSpaceDialog
        visible={visible}
        hide={_hidePasswordModal}
        name={password}
        security={true}
        dialogTitle={
          isProtected
            ? i18n.t('document.renewFolderPassword')
            : i18n.t('document.addFolderPassword')
        }
        dialogPlaceholder={
          isProtected
            ? i18n.t('document.newPasswordPlaceholder')
            : i18n.t('document.passwordPlaceholder')
        }
        setName={pwd => setPassword(pwd)}
        valid={_addPassword}
        btnValidName="add"
      />
      <OwnSpaceDialog
        visible={passwordCheckVisible}
        hide={_hidePasswordCheckModal}
        name={password}
        security={true}
        dialogTitle={i18n.t('document.enterFolderPassword')}
        dialogPlaceholder={i18n.t('document.passwordPlaceholder')}
        setName={pwd => setPassword(pwd)}
        valid={_checkPassword}
        btnValidName="validate"
      />
    </View>
  );
};

/**
 * Styles of Folder component
 */
const styles = StyleSheet.create({
  container: { flex: 1 },
  rowFolder: { flex: 1, flexDirection: 'row' },
  folderContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    paddingRight: 20,
    paddingBottom: 12
  },
  folderItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 8,
    width: 250
  },
  separator: {
    marginLeft: 75,
    borderBottomColor: OWNSPACE_LIGHT_GRAY,
    borderBottomWidth: 0.3,
    marginBottom: 12
  },
  containerMenu: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 12,
    paddingRight: 12
  },
  folderName: {
    paddingLeft: 12
  },
  folderDate: {
    paddingLeft: 13,
    fontSize: 10
  },
  menuOptions: {
    margin: 7,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    borderBottomWidth: 0.3,
    borderColor: OWNSPACE_LIGHT_GRAY,
    paddingBottom: 15
  },
  menuOptionsLast: {
    margin: 7,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  },
  textMenuOptions: {
    marginLeft: 20
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Folder;
