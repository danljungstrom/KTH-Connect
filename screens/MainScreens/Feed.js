import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Post } from '../../components/Post';
import { colors } from "../../assets/colors";
import { usePosts } from "../../services/PostProvider";
import { useCampus } from "../../services/CampusProvider";

export const Feed = () => {
  const { posts } = usePosts();
  const { selectedCampus } = useCampus();

  return (
    <ScrollView style={styles.container}>
      {posts.length > 0 ?
          posts.map(post =>
            <Post
              shownInFeed={true}
              key={post.id}
              postID={post.id}
              showLikeButton={true}
              showCommentButton={true}
              showAttendButton={true}
            />)
        :
          <Text style={styles.text}>Campus {selectedCampus.name.split('KTH ')[1]} doesn't have any posts yet</Text>
      }
        <View style={{height: 100}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: 10,
    paddingTop: 40,
  },
  text: {
    color: colors.text,
    textAlign: 'center',
    marginTop:50
  }
});
