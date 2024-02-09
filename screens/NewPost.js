import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CampusSelector } from '../components/CampusSelector';

//TODO: Implement
export const NewPost = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => navigation.navigate('Main')}>This view will be used to create new posts. Click this text to return to the previous page.</Text>
      <CampusSelector bottom={ true } />
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