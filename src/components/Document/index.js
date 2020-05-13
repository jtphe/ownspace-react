import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import Text from '@shared/ClientText';
import { Button } from 'react-native-paper';
import i18n from '@i18n/i18n';
import BackFolder from '@components/Document/backFolder';
import DocumentList from '@components/Document/documentList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createSelector } from 'reselect';
import { loadFolders, loadFiles } from '@store/modules/document/actions';
import {
  getNbFiles,
  getNbFolders,
  getLoadingState,
  getPath,
  getDocuments,
  getUploadingFile
} from '@store/modules/document/selectors';

/**
 * Connect to the store and extract data
 */
const mapStateToProps = createSelector(
  [
    getNbFiles,
    getNbFolders,
    getLoadingState,
    getPath,
    getDocuments,
    getUploadingFile
  ],
  (nbFiles, nbFolders, loadingState, path, documents, uploadingFile) => {
    return {
      nbFiles,
      nbFolders,
      loadingState,
      path,
      documents,
      uploadingFile
    };
  }
);

/**
 * The HomeList component
 * @param {object} loadingState - The loading state
 * @param {string} path - The current path
 * @param {number} nbFiles - The number of file
 * @param {number} nbFolders - The number of folder
 * @param {object} documents - The document list to display
 * @param {object} uploadingFile - The uploading file
 */
const HomeList = ({
  loadingState,
  path,
  nbFiles,
  nbFolders,
  documents,
  uploadingFile
}) => {
  const dispatch = useDispatch();

  if (loadingState.folders || loadingState.files) {
    return (
      <View style={styles.containerLoading}>
        <Button
          color="#003466"
          labelStyle={styles.loadingText}
          uppercase={false}
          loading={true}
        >
          {i18n.t('document.loading')}
        </Button>
      </View>
    );
  }

  /**
   * Load the folders and the files when we click on the folder
   * @param {object} folderPath - The current path
   */
  const _openFolder = folderPath => {
    dispatch(loadFolders(folderPath));
    dispatch(loadFiles(folderPath));
  };

  /**
   * Render the HomeList component
   * @returns {React.Component} - HomeList component
   */
  return (
    <View style={styles.container}>
      {nbFiles > 0 || nbFolders > 0 ? (
        <View style={styles.container}>
          <BackFolder
            backAction={() => {
              _openFolder(path[path.length - 2]);
            }}
            visible={path.length !== 1}
            name={path[path.length - 2] ? path[path.length - 2].name : ''}
          />
          <DocumentList
            document={documents}
            path={path}
            nbFiles={nbFiles}
            nbFolders={nbFolders}
            uploadingFile={uploadingFile}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <BackFolder
            backAction={() => {
              _openFolder(path[path.length - 2]);
            }}
            visible={path.length !== 1}
            name={path[path.length - 2] ? path[path.length - 2].name : ''}
          />
          <View style={styles.containerNoDoc}>
            <Icon size={70} color="#003466" name="folder" style={styles.icon} />
            <Text style={styles.noDoc}>{i18n.t('document.noDocument')}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

/**
 * Styles of HomeList component
 */
const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  container: {
    flex: 1
  },
  loadingText: {
    color: '#003466',
    fontSize: 22
  },
  containerNoDoc: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps)(HomeList);