import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

//TODO: Implement
export const Feed = ({navigation}) => {

    //TODO: Implement navigation between the screens and implement the navbar
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => navigation.navigate('ChooseCampus')}>Main</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'rgba(123, 163, 191, 1)',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(1, 25, 52, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
