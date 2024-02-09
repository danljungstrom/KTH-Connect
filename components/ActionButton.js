import React from 'react';
import {Pressable, StyleSheet, Text} from "react-native";
import {colors} from "../assets/colors";

export const ActionButton = ({onPress, text}) => {

  return (
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: colors.actionButtons,
    paddingVertical: 8,
    width:140,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text: {
    color: 'white',
  }
});