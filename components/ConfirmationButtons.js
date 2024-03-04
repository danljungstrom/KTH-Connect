import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {colors} from "../assets/colors";

export const ConfirmationButtons = ({onConfirm, onCancel}) => {

  return (
    <View style={styles.buttonsContainer}>
        <Pressable
            style={styles.button}
            onPress={onConfirm}
        >
            <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
        <Pressable
            style={styles.button}
            onPress={onCancel}
        >
            <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
      },
      button: {
        marginTop: 15,
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
});
