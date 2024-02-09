import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { Feed } from './MainScreens/Feed';
import { Campus } from './MainScreens/Campus';
import { Profile } from './MainScreens/Profile';
import { CampusSelector} from '../components/CampusSelector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCampus } from '../services/CampusProvider';

import {
  campusIcon,
  campusIconFilled, chatIcon,
  feedIcon,
  feedIconFilled,
  plusIcon,
  profileIcon,
  profileIconFilled
} from "../assets/icons";

//Screen names
const feedName = 'Feed';
const campusName = 'Campus';
const newPostName = 'New Post';
const chatName = 'Chat';
const profileName = 'Profile';

//Button component for New post and Chat (non-navbar-screens)
const NavButton = ({ icon, label, onPress }) => {
  return (
    <View style={styles.navButtonContainer}>
      <Pressable onPress={onPress} style={{height:30, alignItems: 'center', justifyItems: 'center'}}>
        {icon}
      </Pressable>
      <Text style={styles.navButtonText}>{label}</Text>
    </View>
  );
};

//Empty component used in the non-navbar screens
const DummyComponent = () => {
  return null;
};

//Navbar
export const Main = ({navigation}) => {
  const { selectedCampus } = useCampus();
  const Tab = createBottomTabNavigator();

  return (
    <>
      <CampusSelector/>
      <Tab.Navigator
        initialRouteName={feedName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let icon;
            let rn = route.name;
            
            if(rn === feedName) {
              icon = focused ? feedIcon : feedIconFilled;
            }
            else if(rn === campusName){
              icon = focused ? campusIconFilled : campusIcon;
            }
            else if(rn === profileName) {
              icon = focused ? profileIconFilled : profileIcon
            }

            return icon
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
          tabBarStyle: {
            backgroundColor: 'rgba(1, 25, 52, 1)',
            borderTopColor: '#0A2D4B',
            borderTopWidth: 1,
            height: 70,
            paddingTop: 5,
            paddingBottom: 5,
          },
        })}
        
        >

        <Tab.Screen name={feedName} component={Feed} options={{ headerShown: false }}/>
        <Tab.Screen name={campusName} component={Campus} options={{ headerShown: false }}/>
        <Tab.Screen
          name="NewPost"
          component={DummyComponent}
          options={{
            tabBarButton: () => (
              <NavButton icon={plusIcon} label={newPostName} onPress={() => navigation.navigate('NewPost')} />
            )
          }}
        />
        <Tab.Screen
          name="Chat"
          component={DummyComponent}
          options={{
            tabBarButton: () => (
              <NavButton icon={chatIcon} label={chatName} onPress={() => navigation.navigate('Chat')} />
            )
          }}
        />
        <Tab.Screen name={profileName} component={Profile} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  navButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  navPostButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingTop: 0,
  },
  navButtonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginTop: 3,
  },
  navPostButtonText:{
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginTop: 14,
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
