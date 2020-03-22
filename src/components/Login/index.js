import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Linking,
  Keyboard
} from 'react-native';
import Logo from '../../shared/Logo/index';
import { Auth } from 'aws-amplify';
import { Actions } from 'react-native-router-flux';
import Toast from "react-native-root-toast";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ifIphoneX } from 'react-native-iphone-x-helper'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const _validateEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const signIn = async () => {
    if (_validateEmail() && password.trim().length >= 8) {
      await Auth.signIn({
        username: email,
        password
      })
        .then(user => {
          setUser(user);
          Actions.twoFactor({ user });
          console.log('successful sign in !');
        })
        .catch(err => {
          Toast.show("Identifiants incorrects", {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP + 30,
            shadow: false,
            opacity: 1
          });
          console.log('error while signing in =>', err);
        }
        )
    } else {
      Toast.show("Email invalide ou mot de passe incorrect", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + 30,
        shadow: false,
        opacity: 1
      });
    }

  }

  const sendEmail = async () => {
    await Linking.openURL("mailto:ownspaceco@gmail.com")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.companyName}>OwnSpace</Text>
        <Text style={styles.welcomeTitle}>Bienvenue !</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={txt => {
              setEmail(txt);
            }}
            autoCapitalize="none"
            returnKeyType={'next'}
            onSubmitEditing={() => {
              passwordTextInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={input => {
              passwordTextInput = input;
            }}
            style={styles.input}
            placeholder="Mot de passe"
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={txt => {
              setPassword(txt);
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode={'contained'}
          uppercase={false}
          labelStyle={{ color: '#fff' }}
          style={styles.btnSignIn}
          onPress={() => {
            signIn()
          }}
        >
          Connexion
          </Button>
        <TouchableOpacity
          style={styles.containerHelp}
          onPress={() => sendEmail()}
        >
          <Text style={styles.btnHelp}>Besoin d'aide ?</Text>
        </TouchableOpacity>
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
  headerContainer: {
    backgroundColor: 'blue',
    paddingTop: 120,
    paddingBottom: 50
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
  buttonContainer: { flexDirection: 'row' },
  btnSignIn: {
    backgroundColor: '#4788D3',
    padding: 6,
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 17,
    fontWeight: 'bold'
  },
  containerHelp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnHelp: {
    fontWeight: '500',
    color: 'white'
  },
  logo: { flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }
});

export default Login;