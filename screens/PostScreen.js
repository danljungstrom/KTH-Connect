import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import {colors} from "../assets/colors";
import {Post} from "../components/Post";

export const PostScreen = ({route, navigation}) => {

    const post = route.params.post

    const comments = [
        {
            author: {name:"Firstname Lastname"},
            comment: "This is a great post"
        },
        {
            author: {name:"Firstname Lastname"},
            comment: "More comments"
        },
        {
            author: {name:"Firstname Lastname"},
            comment: "Ok"
        },
        {
            author: {name:"Firstname Lastname"},
            comment: "This is a great post"
        },
        {
            author: {name:"Firstname Lastname"},
            comment: "More comments"
        },
        {
            author: {name:"Firstname Lastname"},
            comment: "Ok"
        }
    ]

    return (
        <ScrollView style={styles.container}>
            <Post
                navigation={navigation}
                link={false}
                key={post.id}
                post={post}
                showLike={true}
                showComment={false}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        paddingBottom: 10
    }
})