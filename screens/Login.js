import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { useUser } from '../services/UserProvider';
import PrivateProfileModal from '../components/PrivateProfileModal';
import ErrorModal from '../components/ErrorModal';

export const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useUser();
  const [isPrivateProfileModalVisible, setPrivateProfileModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorModal = (message) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  getUser = async () => {
    if (username === '' || password === '') {
      showErrorModal('Please enter username and password');
    }

    if(username.includes('@')) {
      username = username.split('@')[0];      
    }

    const user = await signIn(username, password);

    if(user == 'failedAuthNoUser') {
      showErrorModal('User doesn\'t exist.');
    }
    else if(user === 'failedAuth') {
      showErrorModal('Incorrect password.');
    }
    else if (user === '404') {
      setPrivateProfileModalVisible(true);
    }
    else if (user.currentCampus) {
      navigation.navigate('Main');
    }
    else{
      navigation.navigate('ChooseCampus')
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
      <Text style={styles.text}>KTH-Mail</Text>
      <TextInput style={styles.input} onChangeText={setUsername}></TextInput>
      <Text style={styles.text}>Password</Text>
      <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry={true}></TextInput>
      <Pressable style={styles.button} onPress={() => getUser()}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <PrivateProfileModal
        username={username}
        visible={isPrivateProfileModalVisible}
        onClose={() => setPrivateProfileModalVisible(false)}
      />
      <ErrorModal
        errorMessage={errorMessage}
        visible={isErrorModalVisible}
        onClose={() => setErrorModalVisible(false)}
      />
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
