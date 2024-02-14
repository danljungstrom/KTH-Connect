import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable, TextInput} from 'react-native';
import { CampusSelector } from '../components/CampusSelector';
import { setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import {useUser} from "../services/UserProvider";
import {colors} from "../assets/colors";
import {Author} from "../components/Author";
import {ActionButton} from "../components/ActionButton";

export const NewPost = ({navigation}) => {

  const user = useUser()
  const [creatingEvent, setCreatingEvent] = useState(false)
  const [postContent, setPostContent] = useState('')

  const addPost = async (post) => {
    console.log(post.id)
    const postRef = doc(db, 'Posts', post.id.toString());

    try {
      await setDoc(postRef, {
        id: post.id,
        creator: post.creator,
        content: post.content,
        comments: post.comments,
        likes: post.likes,
        liked: null,
        image: post.image,
        eventInfo: post.eventInfo,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  function onPost() {

  }

  function onCancel() {
    // TODO warn user post will be discarded?
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.postTypeMenu}>
        <Pressable onPress={() => setCreatingEvent(false)}>
          <Text style={{...styles.postTypeChoice, ...(creatingEvent ? {} : styles.activePostTypeChoice)}}>
            Text
          </Text>
        </Pressable>
        <Pressable onPress={() => setCreatingEvent(true)}>
          <Text style={{...styles.postTypeChoice, ...(creatingEvent ? styles.activePostTypeChoice : {})}}>
            Event
          </Text>
        </Pressable>
      </View>

      <View style={styles.postContainer}>
        <Author user={user}/>

        <TextInput multiline
                   placeholder="Write your post..."
                   placeholderTextColor={colors.lowOpacityText}
                   numberOfLines={10}
                   style={styles.postInput}
                   onChangeText={setPostContent}/>

      </View>

      <View style={styles.buttonContainer}>
        <ActionButton text={"Post"} onPress={onPost}/>
        <ActionButton text={"Cancel"} onPress={onCancel}/>
      </View>

      <CampusSelector bottom={ true } />
    </View>
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
    justifyContent: 'flex-start',
    paddingVertical: 50
  },
  postTypeMenu: {
    flexDirection: 'row',
    gap: 10
  },
  postTypeChoice: {
    color: colors.text
  },
  activePostTypeChoice: {
    textDecorationLine: 'underline'
  },
  postContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginVertical: 20,
    borderColor: colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    rowGap:15
  },
  postInput: {
    color: colors.text
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10
  }
});
