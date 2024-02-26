import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Post } from '../../components/Post';
import { colors } from "../../assets/colors";
import {subscribeToPostIDList} from "../../firebaseFunctions";
import {useCampus} from "../../services/CampusProvider";

export const Feed = () => {
  const { selectedCampus } = useCampus();
  const [postIDs, setPostIDs] = useState([]);
  const [unsubscribe, setUnsubscribeReference] = useState(null)

  useEffect(() => {
    if(unsubscribe)
      unsubscribe()
    const unsub = subscribeToPostIDList(setPostIDs, selectedCampus.name)
    setUnsubscribeReference(() => unsub)
  }, [selectedCampus]);

  return (
    <ScrollView style={styles.container}>
      {postIDs.length > 0 ?
          postIDs.map(postID =>
            <Post
              shownInFeed={true}
              key={postID}
              postID={postID}
              showLikeButton={true}
              showCommentButton={true}
              showAttendButton={true}
            />)
        :
          <Text style={styles.text}>No posts yet</Text>
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
