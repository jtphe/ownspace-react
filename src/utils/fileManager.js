import FileViewer from 'react-native-file-viewer';
import { Alert, PermissionsAndroid } from 'react-native';
import i18n from '@i18n/i18n';

/**
 * Open a file with his given path (using Intent on Android & native FileViewer on IOS)
 * If the file cannot be opened (e.g format not supported), display an Alert to the user
 * @param {string} path - File's path to open
 */
export const openFile = async path => {
  try {
    await FileViewer.open(path, { showOpenWithDialog: true });
  } catch (error) {
    console.log('error =>', error);
    Alert.alert(
      i18n.t('document.cannotOpen'),
      i18n.t('document.downloadSpecificApp')
    );
  }
};

/**
 * Get the write permissions on Android
 * @return {boolean} - True if we got the right, false in any other case
 */
export const requestAndroidWriteExternalStorage = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
