import React from 'react';
import { View, FlatList } from 'react-native';
import Text from '@shared/ClientText';
import File from '@components/Document/file';
import Folder from '@components/Document/folder';
import UploadDocument from '@components/Document/uploadDocument';
import i18n from '@i18n/i18n';

/**
 * The DocumentList component
 * @param {object} document - The document list to display
 * @param {string} path - The current path
 * @param {number} nbFiles - The number of file
 * @param {number} nbFolders - The number of folder
 * @param {object} uploadingFile - The uploading file
 */
const DocumentList = ({
  document,
  path,
  nbFiles,
  nbFolders,
  uploadingFile
}) => {
  /**
   * Render the DocumentList component
   * @returns {React.Component} - DocumentList component
   */
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {document.length > 0 ? (
          <View style={styles.documentContainer}>
            <FlatList
              data={document}
              extraData={document}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                item.nbFiles >= 0 ? (
                  <Folder folder={item} path={path} />
                ) : (
                  <File file={item} />
                )
              }
            />
            <FlatList
              data={uploadingFile}
              extraData={uploadingFile}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <UploadDocument content={item.name} document={item} />
              )}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.numberDoc}>
        <Text>
          {nbFolders > 0
            ? `${i18n.t('document.nbFolder', {
                count: nbFolders
              })}`
            : null}
          {nbFiles > 0
            ? `${i18n.t('document.nbFile', {
                count: nbFiles
              })}`
            : null}
        </Text>
      </View>
    </View>
  );
};

/**
 * Styles of Home component
 */
const styles = {
  container: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    paddingBottom: 90
  },
  numberDoc: {
    marginBottom: 18,
    paddingTop: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  documentContainer: {
    paddingTop: 20
  }
};

export default DocumentList;
