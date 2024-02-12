import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export const PostAuthor = ({name, image}) => {
    return (
        <View style={styles.user}>
            <Image style={styles.avatar} source={{uri: image}} />
            <Text style={styles.name}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    user: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 23,
        height: 23,
        borderRadius: 50,
        marginRight: 5
    },
    name: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
        fontWeight: 'bold'
    }
});