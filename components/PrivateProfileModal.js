import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { colors } from '../assets/colors';

const PrivateProfileModal = ({ username, visible, onClose }) => {
  const handlePressLink = () => {
    const profileUrl = 'https://www.kth.se/profile/' + username + '/edit';
    Linking.openURL(profileUrl).catch(err => console.error('An error occurred', err));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            It seems you have a private KTH Social profile. For the app to work you have to have a public KTH Social profile. Click "Edit Profile" to be redirected to KTH Social.
          </Text>
          <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.button}
            onPress={handlePressLink}
          >
            <Text style={styles.linkText}>Edit Profile</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 140
  },
  modalView: {
    margin: 20,
    backgroundColor: '#002244',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row'
  },
  button: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    elevation: 2,
    backgroundColor: colors.loginButtons
  },
  textStyle: {
    color: colors.text,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: colors.text,
    marginBottom: 15,
    textAlign: "center"
  },
  linkText: {
    color: colors.text,
    fontWeight: "bold",
  }
});

export default PrivateProfileModal;