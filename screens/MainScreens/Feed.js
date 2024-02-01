import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Post } from '../../components/Post';

export const Feed = ({navigation}) => {

  const posts = [
    { 
      id:1, 
      user:{name:"Firstname Lastname"}, 
      content:"Picture of mangos", 
      comments: 3,
      likes:44,
      liked:false
    },
    { 
      id:2, 
      user:{name:"Firstname Lastname"}, 
      content:"Hej", 
      comments: 5,
      likes:676,
      liked:false
    },
  ]

  return (
    <View style={styles.container}>
      {posts.map(post => 
        <Post 
          key={post.id}
          post={post}
          showLike={true}
          showComment={true}
        />)}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'rgba(123, 163, 191, 1)',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(1, 25, 52, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
