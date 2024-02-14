import React from "react";
import {Author} from "./Author";
import {StyleSheet, Text, View} from "react-native";
import {colors} from "../assets/colors";

export const Comment = ({comment}) => {
    return(
        <View style={styles.container}>
            <Author user={comment.author}/>
            <Text style={styles.text}>
                {comment.comment}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:10,
        marginVertical:5
    },
    text: {
        color: colors.text,
        margin:5
    },
})