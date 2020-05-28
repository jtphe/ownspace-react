import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { StyleSheet, View, Platform } from 'react-native';
import Text from '@shared/ClientText';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import i18n from '@i18n/i18n';
import { Actions } from 'react-native-router-flux';
import OwnSpaceDialog from '@shared/Dialog';
import showToast from '@utils/showToast';
import {
  createFolder,
  addSelectedPicture,
  addDocument
} from '@store/modules/document/actions';
import ImagePicker from 'react-native-image-crop-picker';
import octetToMoConverter from '@utils/fileSizeConverter';
import { createSelector } from 'reselect';
import { getCurrentPathString } from '@store/modules/document/selectors';
import DocumentPicker from 'react-native-document-picker';

/**
 * Animation that makes slide in the menu from the bottom of the screen.
 */
const { SlideInMenu } = renderers;

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
 * The MenuPlus component
 * @param {function} setRefPlus - Set the ref to the plus menu
 */
const MenuPlus = ({ setRefPlus, currentPathString }) => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  /**
   * Show the modal to create folder
   */
  const _showCreateFolderModal = () => {
    setVisible(true);
  };

  /**
   * Hide the modal to create folder
   */
  const _hideCreateFolderModal = () => {
    setName('');
    setVisible(false);
  };

  /**
   * Create the folder
   */
  const _createFolder = () => {
    if (name.trim().length >= 2 && name.trim().length <= 40) {
      const payload = { name };
      dispatch(createFolder(payload));
      _hideCreateFolderModal();
    } else {
      showToast(i18n.t('document.noEmpty'), true);
    }
  };

  /**
   * Open the photo gallery
   */
  const _openPhotoGallery = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        multiple: false,
        cropping: true,
        includeBase64: true
      }).then(image => {
        _onSelectedPicture(image);
      });
    }, 500);
  };

  /**
   * Open the phone camera
   */
  const _openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: true
    }).then(image => {
      _onSelectedPicture(image);
    });
  };

  /**
   * Open the document picker
   */
  const _openDocumentPicker = async () => {
    try {
      const document = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });

      const documentExtension = document.name.split('.')[1];
      if (documentExtension !== 'pages') {
        const payload = {
          name: document.name,
          type: document.type ? document.type : 'application/octet-stream',
          size: parseFloat(octetToMoConverter(document.size)),
          absolutePath: document.uri,
          path: currentPathString + document.name
        };
        dispatch(addDocument(payload));
      } else {
        showToast(i18n.t('document.notSupported'), true);
      }
    } catch (e) {
      console.log('Error =>', e);
    }
  };

  /**
   * Handle the image received and add to DB and S3
   * @param {objet} image - The image selected
   */
  const _onSelectedPicture = async image => {
    const payload = {
      name:
        Platform.OS === 'ios'
          ? image.filename
          : `${Date.now()}.${image.path.split('.').pop()}`,
      type: image.mime,
      size: parseFloat(octetToMoConverter(image.size)),
      absolutePath: image.path,
      path:
        Platform.OS === 'ios'
          ? currentPathString + image.filename
          : `${currentPathString}${Date.now()}.${image.path.split('.').pop()}`
    };
    dispatch(addSelectedPicture(payload));
  };

  /**
   * Render the MenuPlus component
   * @returns {React.Component} - MenuPlus component
   */
  return (
    <View>
      <Menu ref={setRefPlus} renderer={SlideInMenu}>
        <MenuTrigger />
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
          <MenuOption
            value={1}
            customStyles={{
              optionWrapper: styles.menuOptions
            }}
            onSelect={() => _openDocumentPicker()}
          >
            <View style={styles.options}>
              <Icon name="import" size={25} color="#003466" />
              <Text style={styles.textMenuOptions}>
                {i18n.t('menuPlus.importFile')}
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            value={2}
            customStyles={{
              optionWrapper: styles.menuOptions
            }}
            onSelect={() => Actions.createFile()}
          >
            <View style={styles.options}>
              <IconFeather name="file-plus" size={25} color="#003466" />
              <Text style={styles.textMenuOptions}>
                {i18n.t('menuPlus.createFile')}
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            value={3}
            customStyles={{
              optionWrapper: styles.menuOptions
            }}
            onSelect={() => _showCreateFolderModal()}
          >
            <View style={styles.options}>
              <IconFeather name="folder-plus" size={25} color="#003466" />
              <Text style={styles.textMenuOptions}>
                {i18n.t('menuPlus.createFolder')}
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            value={4}
            customStyles={{
              optionWrapper: styles.menuOptions
            }}
            onSelect={() => _openPhotoGallery()}
          >
            <View style={styles.options}>
              <IconFeather name="image" size={25} color="#003466" />
              <Text style={styles.textMenuOptions}>
                {i18n.t('menuPlus.imageGallery')}
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            value={5}
            customStyles={{
              optionWrapper: styles.menuOptionsLast
            }}
            onSelect={() => _openCamera()}
          >
            <View style={styles.options}>
              <IconFeather name="camera" size={25} color="#003466" />
              <Text style={styles.textMenuOptions}>
                {i18n.t('menuPlus.takePicture')}
              </Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <OwnSpaceDialog
        visible={visible}
        hide={_hideCreateFolderModal}
        name={name}
        security={false}
        dialogTitle={i18n.t('document.createFolderTitle')}
        dialogPlaceholder={i18n.t('document.createFolderPlaceholder')}
        setName={newName => setName(newName)}
        valid={_createFolder}
        btnValidName="create"
      />
    </View>
  );
};

/**
 * Styles of CreateFile component
 */
const styles = StyleSheet.create({
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

export default connect(mapStateToProps)(MenuPlus);
