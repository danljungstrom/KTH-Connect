import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { trashIcon, penIcon } from '../assets/icons';
import {colors} from "../assets/colors";

export const EditButtons = ({onPressEdit, onPressDelete}) => {

  return (
    <View style={styles.buttonsContainer}>
      <Pressable onPress={onPressEdit} style={styles.button}>
        <FontAwesomeIcon icon={ penIcon } color={colors.icons}/>
      </Pressable>
      <Pressable onPress={onPressDelete} style={styles.button}>
        <FontAwesomeIcon icon={ trashIcon } color={colors.icons}/>
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
