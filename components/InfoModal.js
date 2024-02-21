import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../assets/colors';

const InfoModal = ({ title, message, visible, onClose }) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalText}>{title}</Text>
        <Text style={styles.messageText}>{message}</Text>
        {title === 'Error' && <Pressable
            style={styles.button}
            onPress={onClose}
        >
            <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>}
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
    backgroundColor: colors.chooseCampusBackground,
    borderWidth: 1,
    borderColor: colors.chooseCampusBorder,
    borderRadius: 10,
    padding: 60,
    alignItems: "center",
    minWidth: 250,
    minHeight: 200,
  },
  button: {
    marginTop: 25,
    minWidth: 100,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: colors.actionButtons
  },
  buttonText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 15,
    textAlign: "center"
  },
  messageText: {
    color: colors.text,
    marginBottom: 15,
    textAlign: "center"
  }
});

export default InfoModal;