import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

//TODO: Implement
export const Chat = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Messages</Text>
      
    </View>
  );
}
//<Text style={styles.text} onPress={() => navigation.navigate('Main')}>This page will contain all chats with other students. Click the text to return to the previous page.</Text>

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'rgba(123, 163, 191, 1)',
    margin: 30,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(1, 25, 52, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
