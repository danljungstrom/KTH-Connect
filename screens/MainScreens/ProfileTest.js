/* import React, { useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import { useUser } from '../../services/UserProvider';
import { fetchUserProfile } from '../../services/UserAPI';


//TODO: Implement

export const Profile = ({navigation}) => {
  const { currentUser } = useUser();
  const [ currentUserProfile, setCurrentUserProfile ] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUserProfile(currentUser.username);
      setCurrentUserProfile(userData);
    };
    
    fetchUserData();
  }, []);
     
  return (
    <>
      {currentUserProfile && <View style={styles.container}>
      <Image style={styles.avatar} source={currentUserProfile.image} />
      <Text style={styles.text1}>{currentUserProfile.givenName + " " + currentUserProfile.familyName}</Text>
      <Text style={styles.text2}>{currentUser.username + '@kth.se'}</Text>
      <Text style={styles.text3}>Posts</Text>
      <View style={styles.horizontalLine}></View>
      </View>}

    </>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 25,
    color: 'rgba(255, 255, 255, 255)',
    margin: 0,
    top: -300 ,
    left: 50
  },
  text2: {
    fontSize: 20,
    color: 'rgba(128, 128, 128, 255)',
    margin: 0,
    top: -300 ,
    left: 26   
  },
  text3:{
   fontSize: 15,
   color: 'rgba(255,255,255,255)',
   margin: 0,
   top: -200 ,
   left: 0,
   textDecorationLine:'underline'   
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(1, 25, 52, 1)',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 5,
    top: -225,
    right: 125,
    
},
horizontalLine: {
  width: '100%', 
  height: 0.8, 
  backgroundColor: '#FFFFFF',
  bottom:160 

},
});
/ 