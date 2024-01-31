import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import SMTPMailer from 'react-native-smtp-mailer';

export const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  login = () => {
    console.log('Login:', username, password);

    SMTPMailer.createTransport({
      host: 'smtp.kth.se',
      port: 587,
      secure: true,
      auth: {
        user: username,
        pass: password,
      },
    })
    .verify((error, success) => {
      if (error) {
        console.log('Error:', error);
        setIsAuthenticated(false);
        Alert.alert('Login Failed', 'Please check your credentials');
      } else {
        console.log('Success:', success);
        setIsAuthenticated(true);
        navigation.navigate('ChooseCampus');
      }
    });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
      <Text style={styles.text}>KTH-Mail</Text>
      <TextInput style={styles.input} onChangeText={setUsername}></TextInput>
      <Text style={styles.text}>Password</Text>
      <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry={true}></TextInput>
      <Pressable style={styles.button} onPress={() => login()}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 105,
    height: 105,
    marginBottom: 75,
  },
  text: {
    fontSize: 12,
    color: 'rgba(123, 163, 191, 1)',
    marginLeft: -150,
  },
  input: {
    width: 200,
    height: 40,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    borderBottomWidth: 2,
    borderColor: 'rgba(123, 163, 191, 1)',
    marginBottom: 20,    
  },
  button: {
    width: 200,
    fontSize: 12,
    backgroundColor: 'rgba(0, 53, 111, 1)',
    padding: 7,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(1, 25, 52, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
