import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Pressable} from 'react-native';
import { LikeButton } from './LikeButton';
import { CommentButton } from './CommentButton';
import { Author } from './Author';
import { ResizableImage } from './ResizableImage';
import { colors } from "../assets/colors";
import { ActionButton } from "./ActionButton";
import { fetchUserProfile } from '../services/UserAPI';
import {useNavigation} from "@react-navigation/native";

export const Post = ({shownInFeed, post, showLike, showComment}) => {
    const navigation = useNavigation()
    const [likes, setLikes] = useState(post.likes)
    const [liked, setLiked] = useState(post.liked)
    const [attending, setAttending] = useState(post.eventInfo && post.eventInfo.attending)
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          const userData = await fetchUserProfile(post.creator);
          setUser(userData);
        };

        fetchUserData();
      }, [post.creator]);

    function onLike() {
        setLikes(liked ? (likes - 1) : (likes + 1))
        setLiked(!liked)
    }

    function onAttend() {
        setAttending(!attending)
    }

    function navigateToPost() {
        if(shownInFeed)
            navigation.push("PostScreen", {post})
    }

    return (
    <Pressable style={shownInFeed ? styles.post : {...styles.post, ...styles.postOnPostPage}}
               onPress={navigateToPost}>

        {user && <Author user={user}/>}

        <View style={styles.contentContainer}>
            {post.image &&
            <ResizableImage
                image={post.image}
                width={Dimensions.get('window').width}
                style={styles.image}/>}
            {post.eventInfo && <Text style={styles.eventTitle}>{post.eventInfo.title}</Text>}
            {post.eventInfo &&
                <Text style={styles.eventDates}>{post.eventInfo.startDate} → {post.eventInfo.endDate}</Text>}
            <Text style={styles.content}>{post.content}</Text>
        </View>

        <View style={styles.buttonContainer}>
            {!post.eventInfo && showLike &&
                <LikeButton onPress={onLike} count={likes} liked={liked}/>}
            {!post.eventInfo && showComment &&
                <CommentButton onPress={navigateToPost} count={post.comments}/>}
        </View>

        {post.eventInfo && <ActionButton onPress={onAttend} text={attending ? 'Attending' : 'Attend'}/>}
    </Pressable>
    );
}

const styles = StyleSheet.create({
    post: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 10,
        borderColor: colors.border,
        borderTopWidth: 1,
        rowGap:15
    },
    postOnPostPage: {
        borderBottomWidth:1
    },
    contentContainer: {
        flexDirection:'column',
        rowGap: 10
    },
    image: {
        marginLeft:-10,
    },
    content: {
        fontSize: 14,
        color: colors.text,
        textAlign: 'left',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap:7,
        justifyContent: 'flex-end',
    },
    eventTitle: {
        color: colors.text,
        fontSize:26,
    },
    eventDates: {
        color: colors.text,
    },
});
