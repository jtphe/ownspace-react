import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Header from '@shared/Header/index';
import Menu from '@components/Menu';

const Home = ({ loggedUser }) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.test}>
        <Button onPress={() => Actions.createFile()}>
          Créer un fichier txt
        </Button>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  input: {
    height: 50,
    borderColor: 'black',
    color: 'grey',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20
  },
  test: { flex: 1 }
});

export default Home;
