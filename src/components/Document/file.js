import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
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
import { useDispatch, connect } from 'react-redux';
import {
  openFile,
  requestAndroidWriteExternalStorage
} from '@utils/fileManager';
import RNFetchBlob from 'rn-fetch-blob';
import { getCurrentPathString } from '@store/modules/document/selectors';
import { createSelector } from 'reselect';
import { downloadFile, addFileToCache } from '@store/modules/document/actions';

/**
 *  A hash map containing commonly used folders
 */
const { dirs } = RNFetchBlob.fs;

/**
 * Connect to the store and extract data
 */
const mapStateToProps = createSelector(
  getCurrentPathString,
  currentPathString => {
    return {
      currentPathString
    };
  }
);

/**
 * Animation that makes slide in the menu from the bottom of the screen.
 */
const { SlideInMenu } = renderers;

/**
 * The File component
 * @param {object} file - The file
 * @param {string} currentPathString - The current path
 */
const File = ({ file, currentPathString }) => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const [isDownloading, setIsDownloading] = useState(false);

  /**
   * Open the document
   */
  const _openFile = () => {
    if (!isDownloading) {
      setIsDownloading(true);
      return new Promise((resolve, reject) => {
        const payload = {
          path: currentPathString + file.name,
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
            path: `${SavePath}/${file.name}`
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
   * Render the File component
   * @returns {React.Component} - File component
   */
  return (
    <View style={styles.container}>
      <View style={styles.rowFile}>
        <TouchableOpacity onPress={() => _openFile()}>
          <View style={styles.containerFile}>
            <FileIcon size={36} color="#003466" name={_setIcon(file.type)} />
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
                tintColor="#003466"
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
                color="#858585"
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
                  onSelect={() => console.log('file', file)}
                >
                  <View style={styles.options}>
                    <Icon name="user-plus" size={25} color="#003466" />
                    <Text style={styles.textMenuOptions}>
                      {i18n.t('document.share')}
                    </Text>
                  </View>
                </MenuOption>
                <MenuOption
                  customStyles={{
                    optionWrapper: styles.menuOptions
                  }}
                  value={2}
                  onSelect={() => console.log('file', file)}
                >
                  <View style={styles.options}>
                    <Icon name="lock" size={25} color="#003466" />
                    <Text style={styles.textMenuOptions}>
                      {i18n.t('document.protect')}
                    </Text>
                  </View>
                </MenuOption>
                <MenuOption
                  customStyles={{
                    optionWrapper: styles.menuOptions
                  }}
                  value={3}
                  onSelect={() => console.log('file', file)}
                >
                  <View style={styles.options}>
                    <Icon name="edit" size={25} color="#003466" />
                    <Text style={styles.textMenuOptions}>
                      {i18n.t('document.renameFile')}
                    </Text>
                  </View>
                </MenuOption>
                <MenuOption
                  customStyles={{
                    optionWrapper: styles.menuOptionsLast
                  }}
                  value={4}
                  onSelect={() => console.log('file', file)}
                >
                  <View style={styles.options}>
                    <Icon name="trash" size={25} color="#003466" />
                    <Text style={styles.textMenuOptions}>
                      {i18n.t('document.deleteFile')}
                    </Text>
                  </View>
                </MenuOption>
              </View>
            </MenuOptions>
          </Menu>
        </View>
      </View>
      <View style={styles.separator} />
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
    borderBottomColor: '#A2A8AE',
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
    borderColor: '#ccc',
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

export default connect(mapStateToProps)(File);
