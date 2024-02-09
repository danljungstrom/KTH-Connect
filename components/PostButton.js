import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import {colors} from "../assets/colors";

export const PostButton = ({onPress, icon, text}) => {

  return (
      <Pressable onPress={onPress} style={styles.button}>
        {icon}
        <Text style={styles.text}> {text}</Text>
      </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: colors.accent,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'center'
    },
    text: {
        color: 'white',
    }
});
