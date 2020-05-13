import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Text from '@shared/ClientText';
import { Portal, Dialog, Button } from 'react-native-paper';
import i18n from '@i18n/i18n';
import PropTypes from 'prop-types';

/**
 * The OwnSpaceDialog component
 * @param {boolean} visible - Visibility of the dialog
 * @param {function} hide - Hide the dialog onDismiss
 * @param {string} dialogTitle - Text for the dialog title
 * @param {string} dialogPlaceholder - Text for the dialog placeholder
 * @param {string} name - Name
 * @param {function} setName - Set the name
 * @param {function} create - Start the function associated to the create button
 */
const OwnSpaceDialog = ({
  visible,
  hide,
  dialogTitle,
  dialogPlaceholder,
  name,
  setName,
  create
}) => {
  /**
   * Render the OwnSpaceDialog component
   * @returns {React.Component} - OwnSpaceDialog component
   */
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hide}>
        <Dialog.Title>
          <Text>{dialogTitle}</Text>
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            autoCapitalize="none"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onChangeText={value => {
              setName(value);
            }}
            style={styles.inputeFileName}
            value={name}
            placeholder={dialogPlaceholder}
          />
        </Dialog.Content>
        <Dialog.Actions style={styles.btnRow}>
          <Button
            mode="outlined"
            color="#003466"
            uppercase={false}
            style={styles.btnStyle}
            labelStyle={styles.btnText}
            onPress={hide}
          >
            {i18n.t('button.cancel')}
          </Button>
          <Button
            mode="contained"
            uppercase={false}
            color="#003466"
            labelStyle={styles.btnText}
            onPress={create}
          >
            {i18n.t('button.create')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

/**
 * Styles of OwnSpaceDialog component
 */
const styles = StyleSheet.create({
  inputeFileName: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 4,
    paddingLeft: 14,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#555',
    fontSize: 16,
    height: 44
  },
  btnText: { fontSize: 16, fontFamily: 'DejaVuSans' },
  btnStyle: { borderColor: '#003466' },
  btnRow: {
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 12
  }
});

OwnSpaceDialog.propTypes = {
  name: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired
};

export default OwnSpaceDialog;
