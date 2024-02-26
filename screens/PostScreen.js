import React from "react";
import {ScrollView, View, StyleSheet} from "react-native";
import {colors} from "../assets/colors";
import {Post} from "../components/Post";
import {GoBackButton} from "../components/GoBackButton";
import {NewComment} from "../components/NewComment";

export const PostScreen = ({route, navigation}) => {

    const postID = route.params.postID

    return (
        <View style={styles.container}>
            <ScrollView style={styles.postContainer}>
                <View style={styles.topBar}>
                    <GoBackButton/>
                </View>
                <Post
                    navigation={navigation}
                    shownInFeed={false}
                    key={postID}
                    postID={postID}
                    showLikeButton={true}
                    showCommentButton={false}
                    showComments={true}
                    showAttendButton={true}
                />
            </ScrollView>
            <View style={styles.newCommentContainer}>
                <NewComment postID={postID}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        height:'100%',
        justifyContent: "flex-end"
    },
    postContainer: {
        paddingVertical: 30
    },
    topBar: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 10
    },
    newCommentContainer: {
        padding:15,
        marginBottom:30
    }
})