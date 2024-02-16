import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import {colors} from "../assets/colors";
import {Post} from "../components/Post";
import {GoBackButton} from "../components/GoBackButton";

export const PostScreen = ({route, navigation}) => {

    const post = route.params.post

    return (
        <ScrollView style={styles.container}>
            <GoBackButton navigation={navigation}/>
            <Post
                navigation={navigation}
                shownInFeed={false}
                key={post.id}
                post={post}
                showLikeButton={true}
                showCommentButton={false}
                showComments={true}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        paddingVertical: 30
    }
})