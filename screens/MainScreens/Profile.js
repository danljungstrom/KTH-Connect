import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { useUser } from '../../services/UserProvider';
import { fetchUserProfile } from '../../services/UserAPI';
import { Post } from '../../components/Post';
import { usePosts } from '../../services/PostProvider';
import { useCampus } from '../../services/CampusProvider';
import { colors } from "../../assets/colors";

export const Profile = ({ navigation }) => {
  const { currentUser } = useUser();
  const { posts } = usePosts();
  const { selectedCampus } = useCampus();
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUserProfile(currentUser.username);
      setCurrentUserProfile(userData);
    };

    fetchUserData();
  }, [currentUser.username]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        {currentUserProfile && (
          <>
            <Image style={styles.avatar} source={currentUserProfile.image} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{currentUserProfile.givenName + " " + currentUserProfile.familyName}</Text>
              <Text style={styles.email}>{currentUser.username + '@kth.se'}</Text>
            </View>
          </>
        )}
        <Text style={styles.postsTitle}>Posts</Text>
      </View>
      <ScrollView style={styles.postsContainer}>
        {posts.filter(post => post.creator === currentUser.username).length > 0 ? (
          posts.filter(post => post.creator === currentUser.username).map(post => (
            <Post
              shownInFeed={true}
              key={post.id}
              postID={post.id}
              showLikeButton={true}
              showCommentButton={true}
              showAttendButton={true}
            />
          ))
        ) : (
          <Text style={styles.noPostsText}>You haven't posted anything to {selectedCampus.name.split('KTH ')[1]}</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,

  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 80,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    right: 50
  },
  userInfo: {
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    color: colors.text,
    right: 30,
    top: 10
  },
  email: {
    fontSize: 16,
    color: 'rgba(128,128,128,128)',
    right: 30,
    top: 10
  },
  postsTitle: {
    fontSize: 18,
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    right: 125,
    top: 100,
    textAlign:'center',
    textDecorationLine:'underline'
  },
 
  postsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  noPostsText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
  // ...add any additional styles you need here
});

export default Profile;
