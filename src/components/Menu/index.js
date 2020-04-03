import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import IconMenu from './IconMenu';
import { Actions } from 'react-native-router-flux';
import { useDispatch } from 'react-redux';
import { testUser } from '../../store/modules/documents/actions';

const Menu = () => {
    const [home, setHome] = useState(true);
    const [options, setOptions] = useState(false);
    const [userProfile, setUserProfile] = useState(false);
    const dispatch = useDispatch()

    const test = { "email": Auth.userAttributes.name }

    const logOut = () => {
        Auth.signOut().then(Actions.login())
    }

    const setSelected = name => {
        switch (name) {
            case 'home':
                setHome(true);
                setOptions(false);
                setUserProfile(false);
                break;
            case 'plus-circle':
                setHome(false);
                setOptions(true);
                setUserProfile(false);
                dispatch(testUser(test))
                break;
            case 'user':
                setHome(false);
                setOptions(false);
                setUserProfile(true);
                logOut()
                break;
            default:
                setHome(true);
                setOptions(false);
                setUserProfile(false);
        }

    }

    return (
        <View style={styles.menuContainer}>
            <IconMenu name={'home'} size={40} selected={home} setSelected={name => setSelected(name)} />
            <IconMenu name={'plus-circle'} size={40} selected={options} setSelected={name => setSelected(name)} />
            <IconMenu name={'user'} size={40} selected={userProfile} setSelected={name => setSelected(name)} />
        </View>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        zIndex: 100,
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: '#42688B',
        paddingLeft: 30,
        paddingRight: 30,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default Menu;