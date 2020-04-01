import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DotIcon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';

const IconMenu = ({ name, size, selected, setSelected }) => {

    const getColor = () => {
        if (selected) {
            return '#E30043'
        } else {
            return 'white'
        }
    }

    const getStyle = () => {
        if (!selected) {
            return { marginBottom: 10 }
        } else {
            return { marginTop: 20 }
        }
    }

    return (
        <View style={styles.containerIcon}>
            <TouchableOpacity onPress={() => setSelected(name)}>
                <Icon style={[styles.icon, getStyle()]} name={name} size={size} color={getColor()} />
            </TouchableOpacity>
            {selected ? <DotIcon name="dot-single" size={30} color='#E30043' /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    containerIcon: { flexDirection: 'column', alignItems: 'center' },
    icon: {
        paddingLeft: 30,
        paddingRight: 30
    },
    iconNotSelected: {
        paddingBottom: 10
    }
});


export default IconMenu;