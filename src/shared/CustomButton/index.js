import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper'
import { Actions } from 'react-native-router-flux';

const CustomButton = ({ confirmFunction }) => {
    return (
        <View style={styles.btnContainer}>
            <Button
                mode={'contained'}
                uppercase={false}
                labelStyle={{ color: '#42688B' }}
                contentStyle={styles.btnDimension}
                style={styles.btnCancel}
                onPress={() => Actions.pop()}
            >
                Annuler
        </Button>
            <Button
                mode={'contained'}
                uppercase={false}
                labelStyle={{ color: '#fff' }}
                contentStyle={styles.btnDimension}
                style={styles.btnConfirm}
                onPress={() => confirmFunction()}
            >
                Valider
        </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: { flexDirection: 'row', padding: 35, paddingTop: 20, paddingBottom: 20, marginBottom: 10, justifyContent: 'space-between', },
    btnCancel: {
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: '#42688B',
        borderWidth: 1,
        color: '#42688B'
    },
    btnConfirm: {
        justifyContent: 'center',
        backgroundColor: '#42688B',
        borderColor: 'black'
    },
    btnDimension: {
        height: 45,
        width: 100
    }
})

export default CustomButton;