import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Post } from '../../components/Post';
import {colors} from "../../assets/colors";

export const Feed = ({navigation}) => {

  const posts = [
    { 
      id:1,
      user: {name:"Firstname Lastname"},
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      comments: 3,
      likes: 44,
      liked: false,
      image: {
        source: require('../../assets/mango.jpg'),
        height:229,
        width:640
      },
    },
    { 
      id: 2,
      user: {name:"Firstname Lastname"},
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. #study",
      comments: 5,
      likes: 676,
      liked:false
    },
    {
      id: 3,
      user: {name: "Firstname Lastname"},
      content: "Event info lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      comments: 4,
      image: {
        source: require('../../assets/kth.png'),
        height:108,
        width:306
      },
      eventInfo: {
        title: "Event Title",
        attends: 12,
        attending: false,
        startDate: "Jan 23, 2023  17:00",
        endDate: "Jan 23, 2023  19:00"
      }
    }
  ]

  return (
    <ScrollView style={styles.container}>
      {posts.map(post =>
        <Post
          navigation={navigation}
          shownInFeed={true}
          key={post.id}
          post={post}
          showLike={true}
          showComment={true}
        />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: 10
  },
});
