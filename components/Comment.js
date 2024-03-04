import React, {useEffect, useState} from "react";
import {Author} from "./Author";
import {StyleSheet, Text, View, TextInput} from "react-native";
import {colors} from "../assets/colors";
import {fetchUserProfile} from "../services/UserAPI";
import { EditButtons } from "./EditButtons";
import { useUser } from "../services/UserProvider";
import { deleteComment, editComment } from "../firebaseFunctions"
import { ConfirmationModal } from './ConfirmationModal';
import { ConfirmationButtons } from "./ConfirmationButtons";

export const Comment = ({postID, comment, index}) => {
    const [user, setUser] = useState(null);
    const { currentUser } = useUser();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await fetchUserProfile(comment.author);
            setUser(userData);
        };

        fetchUserData();
    }, [comment.author]);

    const showConfirmationModal = () => {
        setIsModalVisible(true);
    };

    const handleCommentDelete = () => {
        deleteComment(postID,comment.id).then(() => setIsModalVisible(false))
    }

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedContent(comment.comment);
    };

    const handleSave = () => {
        if (!editedContent || editedContent.trim() === '' || editedContent === comment.comment) {
            setIsEditing(false);
            return;
        }

        editComment(postID, index, editedContent).then(() => {
            setIsEditing(false);
        }).catch(error => {
            console.error(error);
        });
    };
    
    const handleCancel = () => {
        setIsEditing(false);
        setEditedContent(comment.comment);
    };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                {user && <Author user={user}/>}
                {currentUser.username === comment.author && <EditButtons onPressDelete={showConfirmationModal} onPressEdit={handleEditClick}/>}
            </View>
            {
                isEditing ? (
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEditedContent}
                            value={editedContent}
                            autoFocus={true}
                            multiline
                        />
                        <ConfirmationButtons onConfirm={handleSave} onCancel={handleCancel}/>
                    </View>
                ) : (
                    <Text style={styles.text}>
                        {comment.comment}
                    </Text>
                )
            }

            <ConfirmationModal
                title="Delete Comment"
                message="Are you sure you want to delete this comment? This action cannot be undone."
                onConfirm={handleCommentDelete}
                onCancel={() => setIsModalVisible(false)}
                isVisible={isModalVisible}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        padding: 5,
        marginVertical: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        color: colors.text,
        margin:5
    },
    input: {
        color: colors.text,
        margin:5
    }
})