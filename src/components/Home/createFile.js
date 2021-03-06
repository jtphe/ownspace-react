import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Keyboard } from 'react-native';
import Text from '@shared/ClientText';
import Header from '@shared/Header/index';
import CustomButton from '@shared/CustomButton';
import { createFile } from '@store/modules/document/actions';
import { useDispatch } from 'react-redux';
import i18n from '@i18n/i18n';
import showToast from '@utils/showToast';
import { OWNSPACE_LIGHT_GRAY } from '@constants';

/**
 * The CreateFile component
 */
const CreateFile = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  /**
   * Creates a file in a txt format
   */
  const _createTxtFile = () => {
    if (title.trim().length > 0 && text.trim().length > 0) {
      if (
        title.trim().length > 6 &&
        text.trim().length > 6 &&
        title.trim().length <= 40
      ) {
        const payload = {
          name: `${title.trim()}.txt`,
          content: text
        };
        dispatch(createFile(payload));
      } else if (title.trim().length >= 40) {
        showToast(i18n.t('createFile.titleTooLong'), true);
      } else {
        showToast(i18n.t('createFile.tooShort'), true);
      }
    } else {
      showToast(i18n.t('createFile.noEmpty'), true);
    }
  };

  /**
   * Render the CreateFile component
   * @returns {React.Component} - CreateFile component
   */
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.inputContainer}>
        <Text style={styles.title}>{i18n.t('menuPlus.createFile')}</Text>
        <TextInput
          style={styles.inputFileName}
          placeholder={i18n.t('createFile.placeholderName')}
          placeholderTextColor="grey"
          selectionColor="grey"
          autoCapitalize="none"
          value={title}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={txt => {
            setTitle(txt);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder={i18n.t('createFile.placeholderContent')}
          multiline={true}
          value={text}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={txt => {
            setText(txt);
          }}
        />
      </View>
      <CustomButton confirmFunction={() => _createTxtFile()} />
    </View>
  );
};

/**
 * Styles of CreateFile component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  inputContainer: { flex: 1, paddingLeft: 35, paddingRight: 35 },
  title: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 28
  },
  inputFileName: {
    fontFamily: 'DejaVuSans',
    color: 'grey',
    backgroundColor: OWNSPACE_LIGHT_GRAY,
    borderRadius: 6,
    padding: 15,
    marginBottom: 25
  },
  input: {
    fontFamily: 'DejaVuSans',
    flex: 1,
    height: 50,
    borderColor: OWNSPACE_LIGHT_GRAY,
    color: 'black',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    marginBottom: 20
  }
});

export default CreateFile;
