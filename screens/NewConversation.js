import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import { db } from '../config/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../assets/colors';
import { useUser } from '../services/UserProvider';
import { Author } from '../components/Author';
import { fetchUserProfile } from '../services/UserAPI';

export const NewConversation = ({ route, navigation }) => {
  const { conversations } = route.params;
  const { currentUser } = useUser();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {          
        const usersInConversations = new Set();
        conversations.forEach(conversation => {
            usersInConversations.add(conversation);
        });
  
        const usersSnapshot = await getDocs(collection(db, 'Users'));
        const allUsers = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        const users = allUsers.filter(user => !usersInConversations.has(user.username) && user.username !== currentUser.username);
        const usersProfiles = await Promise.all(users.map(async user => {
            return fetchUserProfile(user.username)
        }))
  
        setUsers(usersProfiles);
      } catch (error) {
        console.log("Error fetching users or conversations: ", error);
      }
    };
  
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => user.givenName.toLowerCase().includes(searchTerm.toLowerCase()) || user.familyName.toLowerCase().includes(searchTerm.toLowerCase()) || (user.givenName + " " + user.familyName).toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSelectUser = (user) => {
    navigation.navigate('Conversation', { otherUser: user });
  };

  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()}>        
          <MaterialCommunityIcons 
          name={"chevron-left"} 
          color={colors.icons}
          size={30}
          />
        </Pressable>
        <TextInput
            style={styles.searchBar}
            placeholder="Search users..."
            placeholderTextColor={colors.text}
            value={searchTerm}
            onChangeText={setSearchTerm}
        />
      </View>
      <FlatList
        style={styles.searchList}
        data={filteredUsers}
        keyExtractor={item => item.email}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.author} onPress={() => handleSelectUser(item)}>
                <Author user={item} />
            </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 10
    },
    topBar: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 20,
    },
    searchBar: {
      flex: 1,
      height: 40,
      borderBottomWidth: 1,
      borderColor: colors.navBorder,
      borderRadius: 10,
      paddingHorizontal: 10,
      fontSize: 15,
      color: colors.text,
    },
    searchList: {
        marginLeft: 35,
        flex: 1
    },
    author: {
        marginBottom: 5
    }
})