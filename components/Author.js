import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export const Author = ({user}) => {
    return (
        <View style={styles.user}>
            <Image style={styles.avatar}
                   source={user.image ? {uri: user.image} : require('../assets/blank-profile.png')} />
            <Text style={styles.name}>{user.givenName + " " + user.familyName}</Text>
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