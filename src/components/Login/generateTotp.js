import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Button } from 'react-native-paper';
import { Auth } from 'aws-amplify';


const GenerateTotp = ({ user, setHasAuthApp }) => {
    const [code, setCode] = useState('');

    useEffect(() => {
        // To setup TOTP, first you need to get a `authorization code` from Amazon Cognito
        // `user` is the current Authenticated user
        Auth.setupTOTP(user).then((code) => {
            console.log('code', code)
            // You can directly display the `code` to the user or convert it to a QR code to be scanned.
            // E.g., use following code sample to render a QR code with `qrcode.react` component:  
            setCode(code)
        });
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.titleCode}>Entrez ce code dans votre app d'authentification :</Text>
            <View style={styles.codeContainer}>
                <Text style={styles.code}>{code}</Text>
            </View>
            {/* <View style={styles.helper}>
                <Text style={styles.helperText}>Cliquez sur le code pour le copier !</Text>
            </View> */}
            <View style={styles.buttonsContainer}>
                <Button
                    mode={'contained'}
                    uppercase={false}
                    labelStyle={{ color: '#fff' }}
                    style={styles.btnNext}
                    onPress={() => {
                        setHasAuthApp(true)
                    }}>
                    Suivant
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexDirection: 'column' },
    codeContainer: {
        marginTop: 24,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        borderColor: 'transparent',
        backgroundColor: '#F7D8D3',
    },
    code: { fontSize: 17, color: 'white' },
    titleCode: {
        fontSize: 17, color: 'white'
    },
    helper: {
        marginTop: 10,
        alignItems: 'center',
    },
    helperText: {
        color: 'white',
        opacity: 0.5
    },
    btnNext: {
        backgroundColor: '#4788D3',
        padding: 6,
        paddingLeft: 6,
        paddingRight: 6,
        marginTop: 30,
        fontSize: 17,
        fontWeight: 'bold'
    },
})

export default GenerateTotp;