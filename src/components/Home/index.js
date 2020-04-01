import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import { Auth, Storage } from 'aws-amplify';
import { Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Header from '../../shared/Header/index';
import Menu from '../Menu';

const Home = ({ loggedUser }) => {

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ flex: 1 }}>
                <Button onPress={() => Actions.createFile()}>
                    Créer un fichier txt
                </Button>
                <Menu />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'white'
    },
    input: {
        height: 50,
        borderColor: 'black',
        color: 'grey',
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 20
    }
})

export default Home;