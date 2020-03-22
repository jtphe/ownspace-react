import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import Logo from '../../shared/Logo/index';
import GenerateTotp from '../Login/generateTotp';
import { Auth } from 'aws-amplify';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Actions } from 'react-native-router-flux';
import QRCode from 'qrcode.react';


const RenewPwdScreen = ({ pwd, setNewPassword, confirmNewPwd }) => {
    return (
        <View>
            <Text style={styles.text}>
                Veuillez entrer un nouveau mot de passe
                </Text>
            <TextInput
                style={styles.input}
                placeholder="Nouveau mot de passe"
                textContentType="password"
                autoCapitalize="none"
                secureTextEntry={true}
                value={pwd}
                onChangeText={txt => {
                    setNewPassword(txt);
                }}
            />
            <View style={styles.buttonsContainer}>
                <Button
                    mode={'contained'}
                    uppercase={false}
                    labelStyle={{ color: '#fff' }}
                    style={styles.btnSignIn}
                    onPress={() => {
                        confirmNewPwd()
                    }}
                >
                    Valider
          </Button>
            </View>
        </View>
    )
}

const SecondAuthScreen = ({ user }) => {
    const [token, setToken] = useState('');
    const [hasAuthApp, setHasAuthApp] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newUser, setNewUser] = useState(user.challengeName === 'NEW_PASSWORD_REQUIRED');

    console.log('user', user)

    const confirmSignIn = async () => {
        Actions.home();
        // await Auth.confirmSignIn(user, token)
        //     .then(() => console.log('successful confirm sign in !'))
        //     .catch(err => console.log('error while confirming sign in =>', err))
    }

    const confirmNewPwd = async () => {
        await Auth.completeNewPassword(
            user,
            newPassword
        )
        setNewPassword('');

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.companyName}>OwnSpace</Text>
                <Text style={styles.welcomeTitle}>On y est presque !</Text>
            </View>
            <View style={styles.textInputContainer}>
                {newUser ? <RenewPwdScreen pwd={newPassword} setNewPassword={pwd => setNewPassword(pwd)} confirmNewPwd={() => confirmNewPwd()} /> : <View>
                    {hasAuthApp ?
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
                            <View style={styles.buttonsContainer}>
                                <Button
                                    mode={'contained'}
                                    uppercase={false}
                                    labelStyle={{ color: '#fff' }}
                                    style={styles.btnSignIn}
                                    onPress={() => {
                                        confirmSignIn()
                                    }}>
                                    Valider
                                </Button>
                            </View>
                        </View> : <GenerateTotp user={user} setHasAuthApp={value => setHasAuthApp(value)} />}
                </View>}
            </View>
            <View style={styles.logo}>
                <Logo />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2BDB6',
        paddingLeft: 50,
        paddingRight: 50,
    },
    header: {
        ...ifIphoneX({
            paddingTop: 170,
            paddingBottom: 40
        }, {
            paddingTop: 120,
            paddingBottom: 40
        })
    },
    companyName: {
        fontWeight: 'bold',
        fontSize: 48,
        color: 'white'
    },
    welcomeTitle: {
        fontSize: 24,
        color: 'white',
        opacity: 0.4
    },
    textInputContainer: {
        paddingTop: 20
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
    text: {
        color: 'white',
        marginBottom: 20,
        fontSize: 17,
        opacity: 0.7
    },
    btnSignIn: {
        backgroundColor: '#4788D3',
        padding: 6,
        fontSize: 17,
        fontWeight: 'bold'
    },
    logo: { flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }
});

export default SecondAuthScreen;