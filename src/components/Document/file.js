import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert
} from 'react-native';
import Text from '@shared/ClientText';
import FileIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import IconOptions from 'react-native-vector-icons/Entypo';
import formatDate from '@utils/formatDate';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import i18n from '@i18n/i18n';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useDispatch } from 'react-redux';
import {
  openFile,
  requestAndroidWriteExternalStorage
} from '@utils/fileManager';
import RNFetchBlob from 'rn-fetch-blob';
import {
  downloadFile,
  addFileToCache,
  renameDocument,
  deleteDocument,
  addPasswordFile,
  checkFilePassword,
  removePasswordFile,
  checkFilePasswordBeforeDelete
} from '@store/modules/document/actions';
import OwnSpaceDialog from '@shared/Dialog';
import showToast from '@utils/showToast';
import {
  CLIENT_COLOR_PRIMARY,
  OWNSPACE_GRAY,
  OWNSPACE_LIGHT_GRAY
} from '@constants';
import { Actions } from 'react-native-router-flux';

/**
 *  A hash map containing commonly used files
 */
const { dirs } = RNFetchBlob.fs;

/**
 * Animation that makes slide in the menu from the bottom of the screen.
 */
const { SlideInMenu } = renderers;

/**
 * The File component
 * @param {object} file - The file
 * @param {string} currentPathString - The current path
 * @param {object} user - The user
 */
const File = ({ file, currentPathString, user, groupUsers }) => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const [isDownloading, setIsDownloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [renewVisible, setRenewVisible] = useState(false);
  const [name, setName] = useState(file.name);
  const [password, setPassword] = useState('');
  const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);
  const [
    passwordBeforeDeleteVisible,
    setPasswordBeforeDeleteVisible
  ] = useState(false);
  const isOwner = file.owner === user.id;
  const { isProtected } = file;
  /**
   * Open the document
   */
  const _openFile = ({ fileName }) => {
    if (isProtected) {
      _showPasswordFileEntry();
    } else {
      if (!isDownloading) {
        setIsDownloading(true);
        return new Promise((resolve, reject) => {
          const payload = {
            path: currentPathString + fileName,
            resolve,
            reject
          };
          dispatch(downloadFile(payload));
        })
          .then(async value => {
            const SavePath =
              Platform.OS === 'ios' ? dirs.CacheDir : dirs.DownloadDir;

            if (Platform.OS === 'android') {
              if (!requestAndroidWriteExternalStorage()) {
                return;
              }
            }

            RNFetchBlob.config({
              path: `${SavePath}/${fileName}`
            })
              .fetch('GET', value, {})
              .progress({}, (received, total) => {
                setProgress((received / total) * 100);
              })
              .then(res => {
                dispatch(addFileToCache(res.path()));
                setProgress(100);
                setTimeout(() => {
                  setProgress(0);
                }, 800);
                openFile(res.path());
                setIsDownloading(false);
              });
          })
          .catch(error => {
            setIsDownloading(false);
            console.log('error', error);
          });
      }
    }
  };

  /**
   * Show the password modal that protect the file
   */
  const _showPasswordFileEntry = () => {
    setPasswordCheckVisible(true);
  };

  /**
   * Set the right icon to the file
   * @param {string} type - The file type
   */
  const _setIcon = type => {
    switch (type) {
      case 'text/plain':
        return 'file-document';
      case 'image/jpeg':
        return 'file-image';
      case 'application/pdf':
        return 'file-pdf';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'file-table';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'file-word';
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return 'file-powerpoint';
      default:
        return 'file';
    }
  };

  /**
   * Hide the modal to rename file
   */
  const _hideRenameFileModal = () => {
    setVisible(false);
  };

  /**
   * Hide the modal to rename file when cancel
   */
  const _cancelRenameModal = () => {
    if (file.name !== name) {
      setName(file.name);
    }
    setVisible(false);
  };

  /**
   * Show the modal to rename file
   */
  const _showRenameFileModal = () => {
    setVisible(true);
  };

  /**
   * Show the alert to delete the file
   */
  const _showAlertDeleteFile = () => {
    Alert.alert(
      i18n.t('document.deleteFile'),
      i18n.t('document.confirmDeleteFile', { file: file.name }),
      [
        {
          text: i18n.t('button.cancel'),
          style: 'cancel'
        },
        {
          text: i18n.t('button.delete'),
          onPress: () => {
            if (!file.isProtected) {
              const payload = {
                id: file.id,
                name: file.name
              };
              dispatch(deleteDocument(payload));
            } else {
              _showPasswordBeforeDelete();
            }
          }
        }
      ]
    );
  };

  /**
   * Rename the file
   */
  const _renameFile = () => {
    if (name.trim().length >= 2 && name.trim().length <= 40) {
      if (name !== file.name) {
        const payload = {
          id: file.id,
          name,
          oldName: file.name,
          owner: file.owner
        };

        dispatch(renameDocument(payload));
        dispatch({ type: 'M_SET_IS_RENAMED', renamed: false });
        _hideRenameFileModal();
      } else {
        _hideRenameFileModal();
      }
    } else {
      showToast(i18n.t('document.tooShort'), true);
    }
  };

  /**
   * Show the modal to add a password to the file
   */
  const _showPasswordModal = () => {
    setRenewVisible(true);
  };

  /**
   * Show the password modal that will check the password before the file deletion
   */
  const _showPasswordBeforeDelete = () => {
    setPasswordBeforeDeleteVisible(true);
  };

  /**
   * Hide the modal to add a password to the file
   */
  const _hidePasswordModal = () => {
    setPassword('');
    setRenewVisible(false);
  };

  /**
   * Hide the modal that protect the file opening
   */
  const _hidePasswordCheckModal = () => {
    setPassword('');
    setPasswordCheckVisible(false);
  };

  /**
   * Hide the password modal that will check the password before the file deletion
   */
  const _hidePasswordDeleteModal = () => {
    setPassword('');
    setPasswordBeforeDeleteVisible(false);
  };

  /**
   * Check if the file password is good
   */
  const _checkPassword = () => {
    if (password.length > 0) {
      const payload = {
        password,
        file
      };
      dispatch(checkFilePassword(payload));
      _hidePasswordCheckModal();
    }
  };

  /**
   * Check the password that protect the file before deleting it
   */
  const _checkPasswordBeforeDelete = () => {
    if (password.length > 0) {
      const payload = {
        password,
        file
      };
      dispatch(checkFilePasswordBeforeDelete(payload));
      _hidePasswordDeleteModal();
    }
  };

  /**
   * Add a password to a file
   */
  const _addPassword = () => {
    if (password.trim().length > 0) {
      if (password.trim().length >= 8) {
        const payload = {
          id: file.id,
          password
        };
        dispatch(addPasswordFile(payload));
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
   * Remove a password from a file
   */
  const _removePasswordFile = () => {
    Alert.alert(
      i18n.t('document.removeFilePassword', { file: file.name }),
      i18n.t('document.confirmRemoveFilePassword', { file: file.name }),
      [
        {
          text: i18n.t('button.cancel'),
          style: 'cancel'
        },
        {
          text: i18n.t('button.remove'),
          onPress: () => {
            const payload = {
              id: file.id
            };
            dispatch(removePasswordFile(payload));
          }
        }
      ]
    );
  };

  /**
   * Render the File component
   * @returns {React.Component} - File component
   */
  return (
    <View style={styles.container}>
      <View style={styles.rowFile}>
        <TouchableOpacity onPress={() => _openFile({ fileName: file.name })}>
          <View style={styles.containerFile}>
            <FileIcon
              size={36}
              color={CLIENT_COLOR_PRIMARY}
              name={_setIcon(file.type)}
            />
            <View style={styles.fileItem}>
              <Text
                style={styles.fileName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {file.name}
              </Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.fileDate}>{formatDate(file)}</Text>
              </View>
            </View>
            <View style={styles.circularProgress}>
              <AnimatedCircularProgress
                size={22}
                width={2}
                fill={progress}
                tintColor={CLIENT_COLOR_PRIMARY}
                backgroundColor="white"
              />
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
                    Actions.shareModal({ document: file, users: groupUsers })
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
                {isOwner ? (
                  <MenuOption
                    customStyles={{
                      optionWrapper: styles.menuOptions
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
                {isProtected && isOwner ? (
                  <MenuOption
                    customStyles={{
                      optionWrapper: styles.menuOptions
                    }}
                    value={3}
                    onSelect={() => _removePasswordFile()}
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
                {isOwner ? (
                  <MenuOption
                    customStyles={{
                      optionWrapper: styles.menuOptions
                    }}
                    value={4}
                    onSelect={() => _showRenameFileModal()}
                  >
                    <View style={styles.options}>
                      <Icon
                        name="edit"
                        size={25}
                        color={CLIENT_COLOR_PRIMARY}
                      />
                      <Text style={styles.textMenuOptions}>
                        {i18n.t('document.renameFile')}
                      </Text>
                    </View>
                  </MenuOption>
                ) : null}
                {isOwner ? (
                  <MenuOption
                    customStyles={{
                      optionWrapper: styles.menuOptionsLast
                    }}
                    value={5}
                    onSelect={() => _showAlertDeleteFile()}
                  >
                    <View style={styles.options}>
                      <Icon
                        name="trash"
                        size={25}
                        color={CLIENT_COLOR_PRIMARY}
                      />
                      <Text style={styles.textMenuOptions}>
                        {i18n.t('document.deleteFile')}
                      </Text>
                    </View>
                  </MenuOption>
                ) : null}
              </View>
            </MenuOptions>
          </Menu>
        </View>
      </View>
      <View style={styles.separator} />
      <OwnSpaceDialog
        visible={visible}
        hide={_cancelRenameModal}
        name={name}
        dialogTitle={i18n.t('document.renameFileTitle')}
        dialogPlaceholder={i18n.t('document.renameFilePlaceholder')}
        setName={newName => setName(newName)}
        valid={_renameFile}
        btnValidName="rename"
      />
      <OwnSpaceDialog
        visible={renewVisible}
        hide={_hidePasswordModal}
        name={password}
        security={true}
        dialogTitle={
          isProtected
            ? i18n.t('document.renewFilePassword')
            : i18n.t('document.addFilePassword')
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
        dialogTitle={i18n.t('document.enterFilePassword')}
        dialogPlaceholder={i18n.t('document.passwordPlaceholder')}
        setName={pwd => setPassword(pwd)}
        valid={_checkPassword}
        btnValidName="validate"
      />
      <OwnSpaceDialog
        visible={passwordBeforeDeleteVisible}
        hide={_hidePasswordDeleteModal}
        name={password}
        security={true}
        dialogTitle={i18n.t('document.enterFilePassword')}
        dialogPlaceholder={i18n.t('document.passwordPlaceholder')}
        setName={pwd => setPassword(pwd)}
        valid={_checkPasswordBeforeDelete}
        btnValidName="validate"
      />
    </View>
  );
};

/**
 * Styles of File component
 */
const styles = StyleSheet.create({
  container: { flex: 1 },
  rowFile: {
    flex: 1,
    flexDirection: 'row'
  },
  containerFile: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    paddingBottom: 12
  },
  separator: {
    marginLeft: 75,
    borderBottomColor: OWNSPACE_LIGHT_GRAY,
    borderBottomWidth: 0.4,
    marginBottom: 12
  },
  containerMenu: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 12,
    paddingRight: 12
  },
  fileItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 8,
    width: 240
  },
  fileName: {
    flexWrap: 'wrap',
    paddingHorizontal: 12
  },
  detailsContainer: {
    flexDirection: 'row'
  },
  fileDate: {
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
  },
  circularProgress: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default File;
