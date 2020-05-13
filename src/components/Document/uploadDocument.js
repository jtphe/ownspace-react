/* eslint-disable radix */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@shared/Text';
import moment from 'moment';
import 'moment/locale/fr';
import { Button } from 'react-native-paper';
import i18n from '@i18n/i18n';
import PropTypes from 'prop-types';

/**
 * Configure the locale for moment according to the language
 */
const locale = i18n.currentLocale().split('-')[0];
if (locale === 'fr') {
  moment.locale('fr');
} else {
  moment.locale('en');
}

/**
 * The UploadDocument component
 * @param {string} content - The file name
 * @param {object} document - The file
 */
const UploadDocument = ({ content, document }) => {
  const formatDate = () => {
    return moment(document.createdAt).format('LLL');
  };

  /**
   * Render the UploadDocument component
   * @returns {React.Component} - UploadDocument component
   */
  return (
    <View>
      <View style={styles.box}>
        <Button
          color="#003466"
          style={styles.loading}
          uppercase={false}
          loading={true}
        />
        <View style={styles.uploadingFileItem}>
          <Text numberOfLines={1} style={styles.fileName}>
            {content}
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.date}>{formatDate()}</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

/**
 * Styles of UploadDocument component
 */
const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    paddingBottom: 12
  },
  uploadingFileItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 240
  },
  fileName: {
    flexWrap: 'wrap',
    paddingHorizontal: 12
  },
  detailsContainer: {
    flexDirection: 'row'
  },
  date: {
    paddingLeft: 13,
    fontSize: 10
  },
  separator: {
    marginLeft: 75,
    borderBottomColor: '#A2A8AE',
    borderBottomWidth: 0.4,
    marginBottom: 12
  },
  loading: { marginRight: -20 }
});

UploadDocument.propsTypes = {
  content: PropTypes.string,
  document: PropTypes.object
};

export default UploadDocument;
