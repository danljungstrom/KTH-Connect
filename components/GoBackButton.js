import React from "react";
import {Pressable, StyleSheet} from "react-native";
import {colors} from "../assets/colors";
import {useNavigation} from "@react-navigation/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const GoBackButton = () => {
    const navigation = useNavigation()
    return(
        <Pressable onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
                name={"chevron-left"}
                color={colors.icons}
                size={30}
            />
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