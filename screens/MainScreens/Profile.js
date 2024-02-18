import React, { useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useUser } from '../../services/UserProvider';
import { fetchUserProfile } from '../../services/UserAPI';

//TODO: Implement
export const Profile = ({navigation}) => {
  const { currentUser } = useUser();
  const [ currentUserProfile, setCurrentUserProfile ] = useState(null);

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
      <Text style={styles.text}>{currentUserProfile.givenName + " " + currentUserProfile.familyName}</Text>
      <Text style={styles.text}>{currentUser.username + '@kth.se'}</Text>
      </View>}
    </>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 5,
    top: 0,
    left: 0
},
});
