import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { colors } from '../assets/colors';
import { ConfirmationButtons } from './ConfirmationButtons';

export const ConfirmationModal = ({ title, message, onConfirm, onCancel, isVisible }) => {
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <Text style={styles.messageText}>{message}</Text>
          <ConfirmationButtons onConfirm={onConfirm} onCancel={onCancel} />
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
  },
  modalView: {
    margin: 10,
    backgroundColor: colors.chooseCampusBackground,
    borderWidth: 1,
    borderColor: colors.chooseCampusBorder,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: '75%',
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