import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import {colors} from "../assets/colors";
import {Post} from "../components/Post";
import {GoBackButton} from "../components/GoBackButton";
import {Comment} from "../components/Comment";
import {View} from "react-native-web";

export const PostScreen = ({route, navigation}) => {

    const post = route.params.post

    const comments = [
        {
            id: 1,
            author: {name:"Firstname Lastname"},
            comment: "This is a great post"
        },
        {
            id: 2,
            author: {name:"Firstname Lastname"},
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rhoncus diam ut tortor fermentum hendrerit. Nullam bibendum venenatis lectus, non scelerisque orci condimentum nec. Fusce sit amet tempus lectus. Fusce pretium mi dapibus, sollicitudin turpis eget, pulvinar purus."
        },
        {
            id: 3,
            author: {name:"Firstname Lastname"},
            comment: "Ok"
        },
        {
            id: 4,
            author: {name:"Firstname Lastname"},
            comment: "Integer gravida magna nec lacinia gravida. Nullam congue ut nisl ac fermentum. Maecenas sit amet magna semper, accumsan sapien id, pulvinar eros. Fusce ut turpis gravida, accumsan augue in, efficitur nisl. Nullam pretium pellentesque risus, sit amet interdum purus rhoncus at."
        },
        {
            id: 5,
            author: {name:"Firstname Lastname"},
            comment: "More comments"
        },
        {
            id: 6,
            author: {name:"Firstname Lastname"},
            comment: "Ok"
        }
    ]

    return (
        <ScrollView style={styles.container}>
            <GoBackButton navigation={navigation}/>
            <Post
                navigation={navigation}
                shownInFeed={false}
                key={post.id}
                post={post}
                showLike={true}
                showComment={false}
            />
            <View style={styles.commentContainer}>
                {comments.map(comment => <Comment comment={comment} key={comment.id}/> )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        paddingBottom: 10
    },
    commentContainer: {
        margin:5,
    }
})