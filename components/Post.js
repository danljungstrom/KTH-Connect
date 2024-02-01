import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LikeButton } from './LikeButton';
import { CommentButton } from './CommentButton';
import { PostAuthor } from './PostAuthor';

export const Post = ({post, showLike, showComment}) => {

    const [likes, setLikes] = React.useState(post.likes)
    const [liked, setLiked] = React.useState(post.liked)

    function onLike() {
        setLikes(liked ? (likes - 1) : (likes + 1))
        setLiked(!liked)
    }

    function navigateToPost() {
        console.log("navigate to comments")
    }

    return (
    <View style={styles.post}>

        <PostAuthor name={post.user.name}/>

        <View>
            <Text style={styles.content}>{post.content}</Text>
        </View>

        <View style={styles.buttonContainer}>
            {showLike && <LikeButton onPress={onLike} count={likes} liked={liked}/>}
            {showComment && <CommentButton onPress={navigateToPost} count={post.comments}/>}
        </View>
        
    </View>
    );
}

const styles = StyleSheet.create({
    post: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 10,
        borderColor: '#1E364E',
        borderTopWidth: 1,
    },
    content: {
        marginTop: 6,
        marginHorizontal: 4,
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
    },
    buttonContainer: {
        marginTop: 5,
        flexDirection: 'row',
        gap:7,
        justifyContent: 'flex-end',
    }
});
