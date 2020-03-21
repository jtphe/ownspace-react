import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';


const Home = () => {
    return (
    <View style={styles.container}>
        <Text>
            HOLA je suis sur home
        </Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Home;