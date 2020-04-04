import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard
} from 'react-native';
import Header from '../../shared/Header/index';
import { Storage } from 'aws-amplify';
import CustomButton from '../../shared/CustomButton';
import { Actions } from 'react-native-router-flux';
import Toast from "react-native-root-toast";

const CreateFile = () => {
    const [text, setText] = useState('')
    const [title, setTitle] = useState('');

    const createFile = () => {
        if (title.trim().length > 0 && text.trim().length > 0) {
            if (title.trim().length > 6 && text.trim().length > 6) {
                Storage.put(title.concat('.txt'), text)
                    .then(result => console.log(result)) // {key: "test.txt"}
                    .catch(err => console.log(err));
                Actions.pop();
            } else {
                Toast.show("Le nom du fichier et son contenu doivent contenir au moins 6 caractères", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.TOP + 30,
                    shadow: false,
                    opacity: 1
                });
            }
        } else {
            Toast.show("Les champs ne peuvent pas être vide", {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP + 30,
                shadow: false,
                opacity: 1
            });
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Créer un fichier texte</Text>
                <TextInput
                    style={styles.inputFileName}
                    placeholder="Nom du fichier"
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
                    placeholder="Tapez votre texte ici..."
                    autoCapitalize="true"
                    multiline={true}
                    value={text}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    onChangeText={txt => {
                        setText(txt);
                    }}
                />
            </View>
            <CustomButton confirmFunction={() => createFile()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",

    },
    inputContainer: { flex: 1, paddingLeft: 35, paddingRight: 35 },
    title: { marginTop: 15, marginBottom: 15, fontWeight: 'bold', fontSize: 28 },
    inputFileName: {
        backgroundColor: '#DBDBDB',
        borderRadius: 6,
        padding: 15,
        marginBottom: 25
    },
    input: {
        flex: 2,
        height: 50,
        borderColor: '#DBDBDB',
        color: 'black',
        borderWidth: 1,
        borderRadius: 6,
        paddingLeft: 10,
        marginBottom: 20
    }
})

export default CreateFile;