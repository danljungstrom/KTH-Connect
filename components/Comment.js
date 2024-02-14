import React, {useEffect, useState} from "react";
import {Author} from "./Author";
import {StyleSheet, Text, View} from "react-native";
import {colors} from "../assets/colors";
import {fetchUserProfile} from "../services/UserAPI";

export const Comment = ({comment}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await fetchUserProfile(comment.author);
            setUser(userData);
        };

        fetchUserData();
    }, [comment.author]);

    return(
        <View style={styles.container}>
            {user && <Author user={user}/>}
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