import React from "react/index";
import {StyleSheet, TextInput, View} from "react-native";
import {useState} from "react";
import {colors} from "../assets/colors";
import {useUser} from "../services/UserProvider";
import {commentOnPost} from "../firebaseFunctions";

export const NewComment = ({postID}) => {
    const {currentUser} = useUser()
    const [content, setContent] = useState("")

    function sendComment(){
        commentOnPost(postID, currentUser.username, content)
            .then(() => setContent(""))
    }

    return (
        <View>
            <TextInput value={content}
                       placeholder={"Write comment..."}
                       onChangeText={setContent}
                       onSubmitEditing={sendComment}
                       style={styles.input}/>
        </View>)
}

const styles = StyleSheet.create({
    input: {
        backgroundColor:colors.inputChatBox,
        padding:10,
        borderRadius:5
    }
});