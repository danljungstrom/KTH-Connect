import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable, ScrollView } from 'react-native';
import { fetchUserProfile } from '../../services/UserAPI';
import { db } from '../../config/firebaseConfig';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { useUser } from '../../services/UserProvider';
import { colors } from "../../assets/colors";

export const Chat = ({navigation}) => {
  const { currentUser } = useUser();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const conversationsRef = collection(db, 'Conversations');
    const q = query(conversationsRef, where('users', 'array-contains', currentUser.username));
  
    const unsubscribeConversations = onSnapshot(q, async (querySnapshot) => {
      const profilePromises = [];
  
      querySnapshot.forEach((doc) => {
        const otherUsernames = doc.data().users.filter(username => username !== currentUser.username);
        otherUsernames.forEach(otherUsername => {
          profilePromises.push(fetchUserProfile(otherUsername));
        });
      });
  
      const userProfiles = await Promise.all(profilePromises);
  
      let conversationsWithProfiles = querySnapshot.docs.map((doc, index) => {
        return {
          id: doc.id,
          otherUser: userProfiles[index],
          latestMessage: null,
        };
      });
  
      conversationsWithProfiles.forEach((convo, index) => {
        const messagesRef = collection(db, 'Conversations', convo.id, 'messages');
        const lastMessageQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
  
        const unsubscribeMessage = onSnapshot(lastMessageQuery, (messageSnapshot) => {
          if (!messageSnapshot.empty) {
            const latestMessageData = messageSnapshot.docs[0].data();
            setConversations(prevConversations => {
              const updatedConversations = prevConversations.map(conversation => {
                if (conversation.id === convo.id) {
                  return {
                    ...conversation,
                    latestMessage: {
                      ...latestMessageData,
                      timestamp: latestMessageData.timestamp?.toDate(),
                    },
                  };
                }
                return conversation;
              });
  
              updatedConversations.sort((a, b) => {
                const dateA = a.latestMessage?.timestamp || 0;
                const dateB = b.latestMessage?.timestamp || 0;
                return dateB - dateA;
              });
  
              return updatedConversations;
            });
          }
        });
  
        conversationsWithProfiles[index].unsubscribeMessage = unsubscribeMessage;
      });
  
      setConversations(conversationsWithProfiles);
    });
  
    return () => {
      unsubscribeConversations();
      conversations.forEach(convo => {
        if (convo.unsubscribeMessage) {
          convo.unsubscribeMessage();
        }
      });
    };
  }, [currentUser.username]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';

    const messageDate = timestamp;
    const currentDate = new Date();
  
    const dayDifference = Math.floor((currentDate - messageDate) / (1000 * 60 * 60 * 24));

    if (dayDifference < 1) {
      return 'Today, ' + messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else if (dayDifference === 2) {
      return 'Yesterday, ' + messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else if (dayDifference < 7) {
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' }) + 
      ', ' + messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    } else {
      return messageDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) + 
      ', ' + messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
  }

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
            {conversation.latestMessage && <Text style={styles.latestMessage}>{conversation.latestMessage.user === currentUser.username ? 'You: ' : conversation.otherUser.givenName + ": "}{conversation.latestMessage.message}</Text>}
          </View>
          {conversation.latestMessage && (
            <Text style={styles.timestamp}>
              {formatDate(conversation.latestMessage.timestamp)}
            </Text>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
}

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
    marginTop: -1,
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
  timestamp: {
    marginRight: 5,
    fontSize: 10,
    color: colors.lowOpacityText,
  }
});