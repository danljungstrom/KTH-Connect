import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable, ScrollView } from 'react-native';
import { subscribeToConversations } from '../../firebaseFunctions';
import { useUser } from '../../services/UserProvider';
import { colors } from "../../assets/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'; // for more formatting options
dayjs.extend(advancedFormat);

export const Chat = ({navigation}) => {
  const { currentUser } = useUser();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToConversations(currentUser.username, (updatedConversation) => {
        setConversations(prevConversations => {
            const updatedConversations = [...prevConversations];
            const index = updatedConversations.findIndex(c => c.id === updatedConversation.id);
            if (index > -1) {
                updatedConversations[index] = updatedConversation;
            } else {
                updatedConversations.push(updatedConversation);
            }
            updatedConversations.sort((a, b) => b.latestMessage.timestamp - a.latestMessage.timestamp);
            return updatedConversations;
        });
    });
    return () => unsubscribe();
}, [currentUser.username]);

const formatDate = (timestamp) => {
  if (!timestamp || !(timestamp instanceof Date) || isNaN(timestamp)) return 'Invalid date';

  const messageDate = dayjs(timestamp);
  const currentDate = dayjs();

  const dayDifference = currentDate.diff(messageDate.startOf('day'), 'day');

  if (dayDifference === 0) {
    return `Today, ${messageDate.format('HH:mm')}`;
  } else if (dayDifference === 1) {
    return `Yesterday, ${messageDate.format('HH:mm')}`;
  } else if (dayDifference < 7) {
    return `${messageDate.format('dddd, HH:mm')}`;
  } else {
    return `${messageDate.format('dddd, MMM D, HH:mm')}`;
  }
};

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        <MaterialCommunityIcons 
          style={styles.newPostIcon} 
          name="plus" 
          color={colors.icons}
          size={30}
          onPress={() => navigation.navigate('NewConversation', { conversations: conversations.map(convo => convo.otherUser.email.split('@')[0]) })} />
      {conversations && conversations.map(conversation => (
        <Pressable
          key={conversation.id}
          style={styles.conversationItem}
          onPress={() => navigation.navigate('Conversation', { conversationId: conversation.id, otherUser: conversation.otherUser })}
        >
          <Image
            style={styles.avatar}
            source={conversation.otherUser.image}
          />
          <View style={styles.textContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{conversation.otherUser.givenName + " " + conversation.otherUser.familyName}</Text>
              {conversation.otherUser.url === "backup" && <Text style={styles.inactive}>Inactive User</Text>}
            </View>
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
    fontSize: 16,
    fontWeight: 'bold',
    margin: 20,
    marginTop: 50,
    alignSelf: 'center',
    color: colors.text
  },
  newPostIcon: {
    position: 'absolute',
    right: 20,
    top: 45,
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
  nameContainer: {
    flexDirection: 'row',
  },
  inactive: {
    fontSize: 10,
    color: "red",
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 4,
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