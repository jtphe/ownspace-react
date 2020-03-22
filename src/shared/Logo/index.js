import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';

const Logo = () => {
    return (
        <Image
            source={require('./images/os_logo.png')}
            style={styles.logo}
            resizeMode="contain"
        />
    );
};

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        marginLeft: -10,
        resizeMode: 'contain',
        width: 100,
        height: 100
    }
});
export default Logo;