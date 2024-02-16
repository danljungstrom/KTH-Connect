import React from "react";
import {Pressable, StyleSheet, Text} from "react-native";
import {colors} from "../assets/colors";
import {useNavigation} from "@react-navigation/native";

export const GoBackButton = () => {
    const navigation = useNavigation()
    return(
        <Pressable onPress={() => navigation.goBack()} style={styles.container}>
            <Text style={styles.text}>Go back</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10,
        paddingVertical:5,
    },
    text: {
        color: colors.text,
        opacity: 0.7
    }
})