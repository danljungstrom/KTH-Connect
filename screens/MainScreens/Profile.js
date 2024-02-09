import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

//TODO: Implement
export const Profile = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This page will show the users profile and previously posted messages.</Text>
    </View>
  );
}

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
