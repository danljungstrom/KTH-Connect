import * as React from 'react';
import { StatusBar } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/Login';
import { ChooseCampus } from './screens/ChooseCampus';
import { Feed } from './screens/MainScreens/Feed';

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle('light-content');

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="ChooseCampus" component={ChooseCampus} options={{ headerShown: false }}/>
        <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
