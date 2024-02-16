import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { colors } from '../assets/colors';
import { Feed } from './MainScreens/Feed';
import { Campus } from './MainScreens/Campus';
import { Profile } from './MainScreens/Profile';
import { Chat } from './MainScreens/Chat';
import { CampusSelector} from '../components/CampusSelector';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Screen names
const feedName = 'Feed';
const campusName = 'Campus';
const newPostName = 'New Post';
const chatName = 'Chat';
const profileName = 'Profile';

//Button component for New post and Chat (non-navbar-screens)
const NavButton = ({ iconName, label, onPress }) => {
  return (
    <View style={label === newPostName ? styles.navPostButtonContainer : styles.navButtonContainer}>
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons 
          name={iconName} 
          color={colors.icons}
          size={label === newPostName ? 40 : 30}
          margin-top={label === newPostName ? -5 : 0}
          margin-bottom={label === newPostName ? -5 : 0}
        />
      </Pressable>
      <Text style={label === newPostName ? styles.navPostButtonText : styles.navButtonText} margin-top={label === newPostName ? -10 : 0}>{label}</Text>
    </View>
  );
};

//Empty component used in the non-navbar screens
const DummyComponent = () => {
  return null;
};

//Navbar
export const Main = ({navigation}) => {
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
              icon = focused ? 'home' : 'home-outline';
            }
            else if(rn === campusName){
              icon = focused ? 'map-marker' : 'map-marker-outline';
            }
            else if(rn === chatName) {
              icon = focused ? 'chat' : 'chat-outline'
            }
            else if(rn === profileName) {
              icon = focused ? 'account-circle' : 'account-circle-outline'
            }

            return <MaterialCommunityIcons name={ icon } color={colors.icons} size={30}/>
          },
          tabBarActiveTintColor: colors.navTextFocus,
          tabBarInactiveTintColor: colors.navText,
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.navBorder,
            borderTopWidth: 1,
            height: 70,
            paddingTop: 5,
            paddingBottom: 5,
          },
          headerShown: false
        })}
        
        >

        <Tab.Screen name={feedName} component={Feed}/>
        <Tab.Screen name={campusName} component={Campus}/>
        <Tab.Screen
          name="NewPost"
          component={DummyComponent}
          options={{
            tabBarButton: () => (
              <NavButton iconName="plus" label={newPostName} onPress={() => navigation.navigate('NewPost')} />
            )
          }}
        />
        <Tab.Screen name={chatName} component={Chat}/>
        <Tab.Screen name={profileName} component={Profile}/>
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
    color: colors.navText,
    fontSize: 12,
    marginTop: 3,
  },
  navPostButtonText:{
    color: colors.navText,
    fontSize: 12,
    marginTop: -1,
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
