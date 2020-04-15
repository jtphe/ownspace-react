import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Keyboard } from 'react-native';
import Text from '@shared/ClientText';
import Header from '@shared/Header/index';
import CustomButton from '@shared/CustomButton';
import Toast from 'react-native-root-toast';
import { createFile } from '@store/modules/documents/actions';
import { useDispatch } from 'react-redux';
import i18n from '@i18n/i18n';
import { useFonts } from '@use-expo/font';

const CreateFile = () => {
  useFonts({
    // eslint-disable-next-line global-require
    DejaVuSans: require('../../../assets/fonts/DejaVuSans.ttf')
  });
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  /**
   * Creates a file in a txt format
   */
  const createTxtFile = () => {
    if (title.trim().length > 0 && text.trim().length > 0) {
      if (title.trim().length > 6 && text.trim().length > 6) {
        const payload = {
          name: `${title.trim()}.txt`,
          content: text
        };
        dispatch(createFile(payload));
      } else {
        Toast.show(i18n.t('createFile.tooShort'), {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP + 30,
          shadow: false,
          opacity: 1
        });
      }
    } else {
      Toast.show(i18n.t('createFile.noEmpty'), {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + 30,
        shadow: false,
        opacity: 1
      });
    }
  };

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
      <CustomButton confirmFunction={() => createTxtFile()} />
    </View>
  );
};

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
    backgroundColor: '#DBDBDB',
    borderRadius: 6,
    padding: 15,
    marginBottom: 25
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#DBDBDB',
    color: 'black',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    marginBottom: 20
  }
});

export default CreateFile;
