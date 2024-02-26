import React from "react";
import {ScrollView, View, StyleSheet} from "react-native";
import {colors} from "../assets/colors";
import {Post} from "../components/Post";
import {GoBackButton} from "../components/GoBackButton";

export const PostScreen = ({route, navigation}) => {

    const postID = route.params.postID

    return (
        <ScrollView style={styles.container}>
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
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        paddingVertical: 30
    },
    topBar: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 10
    },
})