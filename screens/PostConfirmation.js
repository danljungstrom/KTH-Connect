import React from "react";
import {StyleSheet, Text} from "react-native";
import {colors} from "../assets/colors";
import {ScrollView} from "react-native";
import {Post} from "../components/Post";
import {ActionButton} from "../components/ActionButton";

export const PostConfirmation = ({route, navigation}) => {
    const postID = route.params.postID

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>
                Your post has been published.
            </Text>
            <Post
                shownInFeed={false}
                showLikeButton={false}
                showAttendButton={false}
                showCommentButton={false}
                showComments={false}
                postID={postID}
            />
            <ActionButton text="Return" onPress={() => navigation.navigate("Main")}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: colors.accentText,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        gap: 50
    },
});