import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LikeButton } from './LikeButton';
import { CommentButton } from './CommentButton';
import { PostAuthor } from './PostAuthor';
import { ResizableImage } from './ResizableImage';
import {colors} from "../assets/colors";
import {ActionButton} from "./ActionButton";

export const Post = ({post, showLike, showComment}) => {

    const [likes, setLikes] = React.useState(post.likes)
    const [liked, setLiked] = React.useState(post.liked)
    const [attending, setAttending] = React.useState(post.eventInfo && post.eventInfo.attending)

    function onLike() {
        setLikes(liked ? (likes - 1) : (likes + 1))
        setLiked(!liked)
    }

    function onAttend() {
        setAttending(!attending)
    }

    function navigateToPost() {
        console.log("navigate to comments")
    }

    return (
    <View style={styles.post}>

        <PostAuthor name={post.user.name}/>

        <View style={styles.contentContainer}>
            {post.image && 
            <ResizableImage uri={post.image} 
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
        
    </View>
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
