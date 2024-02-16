import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable, ScrollView } from 'react-native';
import { fetchUserProfile } from '../../services/UserAPI';
import { db } from '../../config/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useUser } from '../../services/UserProvider';
import { colors } from "../../assets/colors";

export const Chat = ({navigation}) => {
  const { currentUser } = useUser();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const conversationsRef = collection(db, 'Conversations');
    const q = query(conversationsRef, where('users', 'array-contains', currentUser.username));
  
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const conversationsPromises = querySnapshot.docs.map(async doc => {
        const otherUsername = doc.data().users.find(username => username !== currentUser.username);
        const userProfile = await fetchUserProfile(otherUsername);
        return {
          id: doc.id,
          otherUser: userProfile,
          latestMessage: doc.data().latestMessage,
        };
      });
  
      const fetchedConversations = await Promise.all(conversationsPromises);
      setConversations(fetchedConversations);
    });
  
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      {conversations && conversations.map(conversation => (
        <Pressable
          key={conversation.id}
          style={styles.conversationItem}
          onPress={() => navigation.navigate('Conversation', { conversationId: conversation.id, otherUser: conversation.otherUser })}
        >
          <Image
            style={styles.avatar}
            source={{ uri: conversation.otherUser.image }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{conversation.otherUser.givenName + " " + conversation.otherUser.familyName}</Text>
            <Text style={styles.latestMessage}>{conversation.latestMessage.user === currentUser.username ? 'You: ' : conversation.otherUser.givenName + ": "}{conversation.latestMessage.message}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 30,
    alignSelf: 'center',
    color: colors.text
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    borderTopColor: colors.accent,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    marginLeft: 10,
  },
  textContainer: {
    marginLeft: 5,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  latestMessage: {
    marginTop: 3,
    fontSize: 14,
    color: colors.lowOpacityText,
  },
});