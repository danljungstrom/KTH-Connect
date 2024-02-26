import React from "react";
import {Pressable} from "react-native";
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