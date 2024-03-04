import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Pressable, TextInput} from 'react-native';
import { attendEvent, likePost, unAttendEvent, unlikePost, editPost, deletePost } from "../firebaseFunctions";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../assets/colors";
import { LikeButton } from './LikeButton';
import { CommentButton } from './CommentButton';
import { Author } from './Author';
import { ResizableImage } from './ResizableImage';
import { ActionButton } from "./ActionButton";
import { EditButtons } from './EditButtons';
import { Comment } from "./Comment";
import { useUser } from "../services/UserProvider";
import { usePosts } from "../services/PostProvider";
import { fetchUserProfile } from '../services/UserAPI';
import { ConfirmationModal } from './ConfirmationModal';
import { ConfirmationButtons } from "./ConfirmationButtons";
import ErrorBoundary from "react-native-error-boundary";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);


export const Post = ({postID, shownInFeed, showLikeButton, showCommentButton, showComments, showAttendButton, showCampus}) => {
    const navigation = useNavigation()
    const { currentUser } = useUser();
    const { posts } = usePosts();
    const [author, setAuthor] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');

    const post = posts.find(p => p.id === postID)
    const likeCount = post && post.likes ? post.likes.length : 0
    const commentCount = post && post.comments ? post.comments.length : 0
    const liked = post && post.likes &&
        post.likes.find(item => item === currentUser.username)
    const attending = post && post.eventInfo && post.eventInfo.attending &&
        post.eventInfo.attending.find(item => item === currentUser.username)

    useEffect(() => {
        if(post && post.creator)
            fetchUserProfile(post.creator).then(setAuthor)
      }, [post]);

    async function onLike() {
        if(liked)
            await unlikePost(postID, currentUser.username)
        else
            await likePost(postID, currentUser.username)
    }

    async function onAttend() {
        if (attending)
            await unAttendEvent(postID, currentUser.username)
        else
            await attendEvent(postID, currentUser.username)
    }

    function navigateToPost() {
        if(shownInFeed)
            navigation.push("PostScreen", {postID: postID})
    }

    function timestampToString(timestamp) {
        // Add 3600 to convert to UTC+1
        return dayjs.unix(timestamp.seconds+3600).format('YYYY-MM-DD HH:mm')
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Invalid date';
      
        const messageDate = dayjs(timestamp);
        const currentDate = dayjs();
      
        const dayDifference = currentDate.diff(messageDate.startOf('day'), 'day');
      
        if (dayDifference === 0) {
          return `Today, ${messageDate.format('HH:mm')}`;
        } else if (dayDifference === 1) {
          return `Yesterday, ${messageDate.format('HH:mm')}`;
        } else if (dayDifference < 7) {
          return `${messageDate.format('dddd, HH:mm')}`;
        } else {
          return `${messageDate.format('dddd, MMM D, HH:mm')}`;
        }
    };

    const showConfirmationModal = () => {
        setIsModalVisible(true);
    };

    const handlePostEdit = () => {
        navigation.navigate("EditPost", { postID: postID })
    }

    const handlePostDelete = () => {
        deletePost(postID)
            .then(() => { 
                navigation.navigate("Feed");
                setIsModalVisible(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedContent(post.content);
      };

      const handleSave = () => {
        if (!editedContent || editedContent.trim() === '' || editedContent === post.content) {
          setIsEditing(false);
          return;
        }

        editPost(postID, editedContent).then(() => {
          setIsEditing(false);
        }).catch(error => {
          console.error(error);
        });
      };
      
      const handleCancel = () => {
        setIsEditing(false);
        setEditedContent(post.content);
      };

    return (post &&
        <>
            <Pressable style={shownInFeed ? styles.post : {...styles.post, ...styles.postOnPostPage}}
                       onPress={navigateToPost}>

            <View style={styles.headerContainer}>
                {author && <Author user={author}/>}
                {post.creator === currentUser.username && <EditButtons onPressEdit={handleEditClick} onPressDelete={showConfirmationModal}/>}
            </View>

                <View style={styles.contentContainer}>
                    {post.image &&
                        <ErrorBoundary FallbackComponent={<Text>Error loading image</Text>}>
                            <ResizableImage
                                image={post.image}
                                width={Dimensions.get('window').width}
                                style={styles.image}/>
                        </ErrorBoundary>}
                    {post.eventInfo && <Text style={styles.eventTitle}>{post.eventInfo.title}</Text>}
                    {post.eventInfo &&
                        <Text style={styles.eventDates}>
                            {timestampToString(post.eventInfo.startDate)} → {timestampToString(post.eventInfo.endDate)}
                        </Text>}
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
                        <Text style={styles.content}>
                            {post.content}
                        </Text>
                    )
                }
                </View>

                {post.eventInfo && showAttendButton &&
                    <ActionButton onPress={onAttend} text={attending ? 'Attending' : 'Attend'}/>}
                    
                <View style={styles.footer}>
                    {post.timestamp && <Text style={styles.timestamp}>{formatDate(timestampToString(post.timestamp))}</Text>}
                    <View style={styles.buttonContainer}>
                        {post.campus && showCampus &&
                            <Text style={styles.campus}>{post.campus}</Text>}
                        {!post.eventInfo && showLikeButton &&
                            <LikeButton onPress={onLike} count={likeCount} liked={liked}/>}
                        {!post.eventInfo && showCommentButton &&
                            <CommentButton onPress={navigateToPost} count={commentCount}/>}
                    </View>
                </View>
            </Pressable>

            {post.comments && showComments &&  <View style={styles.commentContainer}>
                {post.comments.map((comment, index) => <Comment postID={postID} comment={comment} index={index} key={"comment" + index}/> )}
            </View>}

            <ConfirmationModal
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
                onConfirm={handlePostDelete}
                onCancel={() => setIsModalVisible(false)}
                isVisible={isModalVisible}
            />
        </>
    );
}

const styles = StyleSheet.create({
    post: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 10,
        borderColor: colors.border,
        borderBottomWidth: 1,
        rowGap:15
    },
    input: {
        fontSize: 14,
        color: colors.text,
        textAlign: 'left',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'flex-end',
    },
    postOnPostPage: {
        borderBottomWidth:1
    },
    contentContainer: {
        flexDirection:'column',
        rowGap: 10
    },
    image: {
        marginLeft:-10,
    },
    content: {
        fontSize: 14,
        color: colors.text,
        textAlign: 'left',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap:7,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    eventTitle: {
        color: colors.text,
        fontSize:26,
    },
    eventDates: {
        color: colors.text,
    },
    commentContainer: {
        margin:5,
    },
    campus: {
        color: colors.lowOpacityText
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',},
    timestamp: {
        color: colors.lowOpacityText,
        fontSize: 11,
    }
});
