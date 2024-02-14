import * as React from 'react';
import { StatusBar } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/Login';
import { ChooseCampus } from './screens/ChooseCampus';
import { Chat } from './screens/Chat';
import { NewPost } from './screens/NewPost';
import { Main } from './screens/Main';  
import { UserProvider } from './services/UserProvider';
import { CampusProvider } from './services/CampusProvider';
import {PostScreen} from "./screens/PostScreen";

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle('light-content');

export default function App() {
  return (
    <UserProvider>
      <CampusProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="ChooseCampus" component={ChooseCampus} options={{ headerShown: false }}/>
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
            <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}/>
            <Stack.Screen name="NewPost" component={NewPost} options={{ headerShown: false }}/>
            <Stack.Screen name="PostScreen" component={PostScreen} options={{ headerShown: false }} initialParams={{post: "test"}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </CampusProvider>
    </UserProvider>
  );
};
