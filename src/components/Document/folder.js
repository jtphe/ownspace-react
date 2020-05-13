import React from 'react';
import { useDispatch } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '@shared/ClientText';
import FolderIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import formatDate from '@utils/formatDate';
import { loadFolders, loadFiles } from '@store/modules/document/actions';
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

/**
 * Animation that makes slide in the menu from the bottom of the screen.
 */
const { SlideInMenu } = renderers;

/**
 * The Folder component
 * @param {object} folder - The folder
 */
const Folder = ({ folder }) => {
  const dispatch = useDispatch();

  /**
   * Open the folder
   */
  const _openFolder = () => {
    dispatch(loadFolders(folder));
    dispatch(loadFiles(folder));
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
            <FolderIcon size={36} color="#003466" name="folder" />
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
                  onSelect={() => console.log('folder', folder)}
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
                  onSelect={() => console.log('folder', folder)}
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
                  onSelect={() => console.log('folder', folder)}
                >
                  <View style={styles.options}>
                    <Icon name="edit" size={25} color="#003466" />
                    <Text style={styles.textMenuOptions}>
                      {i18n.t('document.renameFolder')}
                    </Text>
                  </View>
                </MenuOption>
                <MenuOption
                  customStyles={{
                    optionWrapper: styles.menuOptionsLast
                  }}
                  value={4}
                  onSelect={() => console.log('folder', folder)}
                >
                  <View style={styles.options}>
                    <Icon name="trash" size={25} color="#003466" />
                    <Text style={styles.textMenuOptions}>
                      {i18n.t('document.deleteFolder')}
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
    borderBottomColor: '#A2A8AE',
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
  }
});

export default Folder;
