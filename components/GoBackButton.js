import React from "react";
import {Text, TouchableOpacity} from "react-native-web";
import {StyleSheet} from "react-native";
import {colors} from "../assets/colors";

export const GoBackButton = ({navigation}) => {
    return(
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.container}>
            <Text style={styles.text}>
                Go back
            </Text>
        </TouchableOpacity>
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