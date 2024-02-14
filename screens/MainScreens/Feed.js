import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Post } from '../../components/Post';
import { colors } from "../../assets/colors";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig'

export const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Posts'));
        const postList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {posts.map(post =>
        <Post
          shownInFeed={true}
          key={post.id}
          post={post}
          showLikeButton={true}
          showCommentButton={true}
        />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: 10,
    paddingTop: 30
  },
});
