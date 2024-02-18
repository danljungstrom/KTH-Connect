import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { colors } from '../assets/colors';

const ErrorModal = ({ errorMessage, visible, onClose }) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalText}>Error</Text>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <Pressable
            style={styles.button}
            onPress={onClose}
        >
            <Text style={styles.buttonText}>OK</Text>
        </Pressable>
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
    borderRadius: 10,
    padding: 50,
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
  button: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    elevation: 2,
    backgroundColor: colors.loginButtons
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 15,
    textAlign: "center"
  },
  errorText: {
    color: colors.text,
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ErrorModal;