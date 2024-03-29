import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { useUser } from '../services/UserProvider';
import PrivateProfileModal from '../components/PrivateProfileModal';
import InfoModal from '../components/InfoModal';
import { colors } from '../assets/colors';

export const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useUser();
  const [isPrivateProfileModalVisible, setPrivateProfileModalVisible] = useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const passwordInputRef = useRef(null);

  const showInfoModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setInfoModalVisible(true);
  };

  getUser = async () => {
    if (username === '' || password === '') {
      showInfoModal('Error', 'Please enter username and password');
    }

    showInfoModal('Loading', 'Logging in...');

    const user = username.includes('@') ? 
      await signIn(username.toLowerCase().split('@')[0], password) : 
      await signIn(username.toLowerCase(), password);

    if(user == 'failedAuthNoUser') {
      showInfoModal('Error', 'User either doesn\'t exist or it has a private KTH Social profile.');
    }
    else if(user === 'failedAuth') {
      showInfoModal('Error', 'Incorrect password.');
    }
    else if (user === '404') {
      setPrivateProfileModalVisible(true);
    }
    else if (user.selectedCampus) {
      setInfoModalVisible(false);
      navigation.navigate('Main');
    }
    else{
      setInfoModalVisible(false);
      navigation.navigate('ChooseCampus')
    }
  }

  const handleUsernameSubmit = () => {
    passwordInputRef.current && passwordInputRef.current.focus();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
      <View style={styles.loginContainer}>
      <Text style={styles.text}>KTH-Mail</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={setUsername}
        onSubmitEditing={handleUsernameSubmit}
        returnKeyType="next"
      ></TextInput>
      <Text style={styles.text}>Password</Text>
      <TextInput 
        style={styles.input} 
        ref={passwordInputRef}
        onChangeText={setPassword}
        secureTextEntry={true} 
        onSubmitEditing={getUser}
        returnKeyType="go"
      ></TextInput>
      <Pressable style={styles.button} onPress={getUser}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      </View>
      <Text style={styles.infoText}>Login using your regular KTH account. Your name and profile picture will be fetched from KTH Social. Note that your password is never saved within the app, it will always use your KTH password and only uses the password to authenticate the login using the KTH email service.</Text>
      <PrivateProfileModal
        username={username}
        visible={isPrivateProfileModalVisible}
        onClose={() => setPrivateProfileModalVisible(false)}
      />
      <InfoModal
        title={modalTitle}
        message={modalMessage}
        visible={isInfoModalVisible}
        onClose={() => setInfoModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 105,
    height: 105,
    borderRadius: 20,
    marginBottom: 100,
  },
  loginContainer: {
    alignItems: 'center',
    width: 300,
  },
  text: {
    fontSize: 12,
    color: colors.accentText,
    marginLeft: -140,
    width: 60
  },
  input: {
    width: 200,
    height: 40,
    fontSize: 15,
    color: colors.text,
    borderBottomWidth: 2,
    borderColor: colors.accentText,
    marginBottom: 20,    
  },
  button: {
    width: 200,
    fontSize: 12,
    backgroundColor: colors.actionButtons,
    padding: 7,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(1, 25, 52, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 12,
    color: colors.accentText,
    textAlign: 'center',
    width: 330,
    marginTop: 100,
    marginBottom: -150,
  }
});
