import * as React from 'react';
import { StatusBar } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/Login';
import { ChooseCampus } from './screens/ChooseCampus';
import { NewPost } from './screens/NewPost';
import { Main } from './screens/Main';  
import { PostScreen } from "./screens/PostScreen";
import { PostConfirmation } from "./screens/PostConfirmation";
import { NewConversation } from './screens/NewConversation';
import { Conversation } from './screens/Conversation';
import { UserProvider } from './services/UserProvider';
import { CampusProvider } from './services/CampusProvider';
import { PostProvider } from './services/PostProvider';

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle('light-content');

export default function App() {
  return (
    <UserProvider>
      <CampusProvider>
        <PostProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="ChooseCampus" component={ChooseCampus}/>
              <Stack.Screen name="Main" component={Main}/>
              <Stack.Screen name="NewPost" component={NewPost}/>
              <Stack.Screen name="NewConversation" component={NewConversation}/>
              <Stack.Screen name="Conversation" component={Conversation}/>
              <Stack.Screen name="PostScreen" component={PostScreen}/>
              <Stack.Screen name="PostConfirmation" component={PostConfirmation}/>
            </Stack.Navigator>
          </NavigationContainer>
        </PostProvider>
      </CampusProvider>
    </UserProvider>
  );
};
