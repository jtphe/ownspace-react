import React from 'react';
import { Button } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';


const TotpAuthScreen = ({ setToken, verifyTotpToken }) => {
    return (
        <View>
            <Text style={styles.text}>
                Saisissez le code d'authentification de l'application d'authentification à deux facteurs sur votre appareil
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Code d'authentification"
                textContentType="password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={txt => {
                    setToken(txt);
                }}
            />
            <Button
                mode={'contained'}
                uppercase={false}
                labelStyle={{ color: '#fff' }}
                style={styles.btnSignIn}
                onPress={() => {
                    verifyTotpToken()
                }}>
                Valider
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        marginBottom: 20,
        fontSize: 17,
        opacity: 0.7
    },
    input: {
        height: 50,
        paddingLeft: 15,
        borderColor: 'transparent',
        backgroundColor: '#F7D8D3',
        color: 'grey',
        opacity: 0.7,
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 25
    },
    btnSignIn: {
        backgroundColor: '#4788D3',
        padding: 6,
        fontSize: 17,
        fontWeight: 'bold'
    }
})

export default TotpAuthScreen;