import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export const PostButton = ({onPress, icon, text}) => {

  return (
    <Pressable onPress={onPress} style={styles.button}>
      <FontAwesomeIcon icon={ icon } color='white'/>
      <Text style={styles.text}> {text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      backgroundColor: '#132E49',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      textAlign: 'center',
    },
    text: {
      color: 'white' 
    }
});
