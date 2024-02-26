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
import {Comment} from "./Comment";
import dayjs from "dayjs";
import {useUser} from "../services/UserProvider";
import {likePost, subscribeToPostChange, unlikePost} from "../firebaseFunctions";

export const Post = ({postID, shownInFeed, showLikeButton, showCommentButton, showComments, showAttendButton}) => {
    const navigation = useNavigation()
    const attending = false
    const [user, setUser] = useState(null);
    const { currentUser } = useUser();
    const [post, setPost] = useState(false)
    const likeCount = post && post.likes ? post.likes.length : 0
    const commentCount = post && post.comments ? post.comments.length : 0
    const liked = post && post.likes &&
        post.likes.find(item => item === currentUser.username)

    useEffect(() => {
        if(post && post.creator) {
            const fetchUserData = async () => {
                const userData = await fetchUserProfile(post.creator);
                setUser(userData);
            };

            fetchUserData();
        }
      }, [post]);

    useEffect(() => {
        subscribeToPostChange(postID, (doc) => {
            setPost(doc.data())
        });
    }, [])

    async function onLike() {
        if(liked)
            await unlikePost(postID, currentUser.username)
        else
            await likePost(postID, currentUser.username)
    }

    function onAttend() {
        // TODO add logged in user to post.eventInfo.attending in firebase
    }

    function navigateToPost() {
        if(shownInFeed)
            navigation.push("PostScreen", {postID: postID})
    }

    function timestampToString(timestamp) {
        return dayjs.unix(timestamp.seconds).format('YYYY-MM-DD HH:mm')
    }

    return (post &&
        <>
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
                        <Text style={styles.eventDates}>
                            {timestampToString(post.eventInfo.startDate)} → {timestampToString(post.eventInfo.endDate)}
                        </Text>}
                    <Text style={styles.content}>{post.content}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    {!post.eventInfo && showLikeButton &&
                        <LikeButton onPress={onLike} count={likeCount} liked={liked}/>}
                    {!post.eventInfo && showCommentButton &&
                        <CommentButton onPress={navigateToPost} count={commentCount}/>}
                </View>

                {post.eventInfo && showAttendButton &&
                    <ActionButton onPress={onAttend} text={attending ? 'Attending' : 'Attend'}/>}

            </Pressable>

            {post.comments && showComments &&  <View style={styles.commentContainer}>
                {post.comments.map((comment, index) => <Comment comment={comment} key={"comment" + index}/> )}
            </View>}
        </>
    );
}

const styles = StyleSheet.create({
    post: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 10,
        borderColor: colors.border,
        borderBottomWidth: 1,
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
    commentContainer: {
        margin:5,
    }
});
