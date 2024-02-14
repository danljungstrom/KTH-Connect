import React from "react";
import {Text, View} from "react-native-web";
import {Author} from "./Author";
import {StyleSheet} from "react-native";
import {colors} from "../assets/colors";

export const Comment = ({comment, navigation}) => {
    return(
        <View style={styles.container}>
            <Author name={comment.author.name}/>
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