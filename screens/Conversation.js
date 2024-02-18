import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable, Image, Modal } from 'react-native';
import { useUser } from '../services/UserProvider';
import { colors } from '../assets/colors';
import { db } from '../config/firebaseConfig';
import { doc, deleteDoc, query, onSnapshot, collection, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Conversation = ({route, navigation}) => {
  const {conversationId, otherUser} = route.params;
  const {currentUser} = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [longPressCoords, setLongPressCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const messagesRef = collection(db, 'Conversations', conversationId, 'messages');
    const q = query(messagesRef, orderBy("timestamp", "asc"));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const timestamp = data.timestamp ? data.timestamp.toDate() : null;
        return {
          id: doc.id,
          ...data,
          timestamp,
        };
      });
    
      const sortedMessages = fetchedMessages.sort((a, b) => (a.timestamp && b.timestamp) ? a.timestamp - b.timestamp : 0);
      setMessages(sortedMessages);
    });
  
    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
    
    const messagesRef = collection(db, 'Conversations', conversationId, 'messages');
    
    await addDoc(messagesRef, {
      user: currentUser.username,
      message: newMessage,
      timestamp: serverTimestamp(),
    });
  
    setNewMessage('');
  };

  const handleLongPress = (event, messageId) => {
    message = messages.find(message => message.id === messageId);
    if (message.user === currentUser.username) {
      const { locationX, locationY } = event.nativeEvent;
      setLongPressCoords({ x: locationX, y: locationY });
      setSelectedMessageId(messageId);
      setModalVisible(true);
    }
  };
  
  const deleteMessage = async (messageId) => {
    const messageToDelete = messages.find(message => message.id === messageId && message.user === currentUser.username);
    
    if (messageToDelete) {
      const messageRef = doc(db, 'Conversations', conversationId, 'messages', messageId);
      try {
        await deleteDoc(messageRef);
      } catch (error) {
        console.error("Error deleting message: ", error);
      }
    } else {
      console.error("Message not found or not authorized to delete it.");
    }
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
        {otherUser && <Text style={styles.userName}>{otherUser.givenName + " " + otherUser.familyName}</Text>}
        <Image style={styles.userImage} source={{ uri: otherUser.image }} />
      </View>
      <ScrollView style={styles.messagesContainer}>
      {messages.map(message => (
      <Pressable key={message.id} style={[
        styles.messageBubble,
        message.user === currentUser.username ? styles.outgoingMessage : styles.incomingMessage
        ]} onLongPress={(event) => handleLongPress(event, message.id)}>
        <Text style={styles.messageText}>{message.message}</Text>
        {message.timestamp ?   <Text style={[styles.timestampText, message.user === currentUser.username ? styles.timestampIncText : styles.timestampOutText]}>
          {message.timestamp.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}
        </Text> : null}
      </Pressable>
      ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Write message..."
          placeholderTextColor={colors.background}
          onSubmitEditing={sendMessage}
        />
        <Pressable onPress={sendMessage} style={styles.sendButton}>
          <MaterialCommunityIcons name="send" size={24} color={colors.background} />
        </Pressable>
      </View>
      {modalVisible && (
  <Modal
    animationType="fade" // Use fade to have a smoother transition
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(false);
    }}
  >
    <Pressable
      style={styles.modalOverlay}
      onPress={() => setModalVisible(false)} // This will close the modal when the overlay is pressed
    >
      <View style={styles.modalView}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            deleteMessage(selectedMessageId);
            setModalVisible(false);
          }}
        >
          <Text style={styles.modalText}>Remove</Text>
        </Pressable>
      </View>
    </Pressable>
  </Modal>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  userName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  userImage: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginTop: -5,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10
  },
  timestampText: {
    color: colors.background,
    marginTop: 5,
    marginBottom: -5,
    fontSize: 10,
  },
  timestampIncText: {
    alignSelf: 'flex-end',
  },
  timestampOutText: {
    alignSelf: 'flex-start',
  },
  messagesContainer: {
    flex: 1,
  },
  messageBubble: {
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  incomingMessage: {
    backgroundColor: colors.incommingMessage,
    borderBottomLeftRadius: 3,
    maxWidth: '60%',
    alignSelf: 'flex-start',
  },
  outgoingMessage: {
    backgroundColor: colors.outgoingMessage,
    borderBottomRightRadius: 3,
    maxWidth: '60%',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.inputChatBox,
    flex: 1,
    padding: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.inputChatBox,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: -10,
  },
  sendButton: {
    width: 49.5,
    height: 49.5,
    backgroundColor: colors.inputChatBox,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputChatBox,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
    backgroundColor: colors.inputChatBox,
  },
  modalText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 12,
    padding: 10,
  }
});