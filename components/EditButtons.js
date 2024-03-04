import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { trashIcon, penIcon } from '../assets/icons';
import {colors} from "../assets/colors";

export const EditButtons = ({onPressEdit, onPressTrash}) => {

  return (
    <View style={styles.buttonsContainer}>
      <Pressable onPress={onPressEdit} style={styles.button}>
        <FontAwesomeIcon icon={ penIcon } color='white'/>
      </Pressable>
      <Pressable onPress={onPressTrash} style={styles.button}>
        <FontAwesomeIcon icon={ trashIcon } color='white'/>
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
        backgroundColor: colors.accent,
        padding: 6,
        borderRadius: 5,
        marginLeft: 5,
    },
});
