import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Post } from '../../components/Post';
import { colors } from "../../assets/colors";
import {subscribeToPostIDList} from "../../firebaseFunctions";

export const Feed = () => {
  const [postIDs, setPostIDs] = useState([]);

  useEffect(() => {
    subscribeToPostIDList(setPostIDs)
  }, []);

  return (
    <ScrollView style={styles.container}>
      {postIDs.map(postID =>
        <Post
          shownInFeed={true}
          key={postID}
          postID={postID}
          showLikeButton={true}
          showCommentButton={true}
          showAttendButton={true}
        />)}
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
});
