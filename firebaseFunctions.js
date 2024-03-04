import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    onSnapshot, 
    serverTimestamp,
    setDoc,
    getDoc,
    deleteDoc,
    updateDoc,
    query,
    orderBy, 
    where,
    limit,
} from "firebase/firestore";
import {db} from "./config/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fetchUserProfile } from "./services/UserAPI";

const postsRef = collection(db, "Posts")
const postQuery = query(postsRef, orderBy("timestamp", "desc"))

const postRef = (postID) => doc(db, 'Posts', postID)
const postQueryForCampus = (campus) => query(postsRef, where("campus", "==", campus),
                                            orderBy("timestamp", "desc"))

export function subscribeToPostChange(postID, callback) {
    return onSnapshot(postRef(postID), callback);
}

export function likePost(postID, username) {
    return updateDoc(postRef(postID), {
        likes: arrayUnion(username)
    })
}

export function unlikePost(postID, username) {
    return updateDoc(postRef(postID), {
        likes: arrayRemove(username)
    });
}

export function fetchPostIDList() {
    return getDocs(postQuery)
        .then(querySnapshot => querySnapshot.docs.map(doc => (doc.id)))
}

export function subscribeToPostIDList(callback, campus = null) {
    let q = campus ? postQueryForCampus(campus) : postQuery
    return onSnapshot(q, (querySnapshot) => {
        const postIDList = [];
        querySnapshot.forEach((doc) => {
            postIDList.push(doc.id);
        });
        callback(postIDList)
    });
}

export function attendEvent(postID, username) {
    return updateDoc(postRef(postID), {
        "eventInfo.attending": arrayUnion(username)
    });
}

export function unAttendEvent(postID, username) {
    return updateDoc(postRef(postID), {
        "eventInfo.attending": arrayRemove(username)
    });
}

export function commentOnPost(postID, username, comment) {
    return updateDoc(postRef(postID), {
        comments: arrayUnion({
            author: username,
            comment,
            date: Date()
        })
    });
}

export function editPost(postID, content) {
    return updateDoc(postRef(postID), {
        content: content
    });
}

export async function editComment(postID, commentIndex, newCommentText) {
    const postSnapshot = await getDoc(postRef(postID));
    if (!postSnapshot.exists()) {
        throw new Error('Post not found');
    }
    const post = postSnapshot.data();

    if (commentIndex < 0 || commentIndex >= post.comments.length) {
        throw new Error('Comment index is out of bounds');
    }

    const updatedComments = [...post.comments];
    
    updatedComments[commentIndex] = {
        ...updatedComments[commentIndex],
        comment: newCommentText,
    };

    return updateDoc(postRef(postID), {
        comments: updatedComments
    });
}


export function deletePost(postID) {
    return deleteDoc(postRef(postID));
}

export async function deleteComment(postID, commentID) {
    const postSnapshot = await getDoc(postRef(postID));
    if (!postSnapshot.exists()) {
        throw new Error('Post not found');
    }
    const post = postSnapshot.data();

    const filteredComments = post.comments.filter(comment => comment.id !== commentID);

    return updateDoc(postRef(postID), {
        comments: filteredComments
    });
}


async function addPost(content, creator, campus, eventInfo = null, image = null) {
    let post = {
        content,
        creator,
        campus,
        timestamp: serverTimestamp()
    }
    if(eventInfo) post = {...post, eventInfo}
    if(image) {
        let url = await uploadImageAsync(image.source.uri, creator)
        post = {...post, image: {source: url, width: image.width, height: image.height}}
    }
    let ref = doc(collection(db, "Posts"));
    await setDoc(ref, post)
    return ref.id
}

export function addTextPost(content, creator, campus, image) {
    return addPost(content, creator, campus, null, image)
}

export function addEventPost(content, creator, campus, title, startDate, endDate, image) {
    return addPost(content, creator, campus, {title, startDate, endDate}, image)
}

// From https://github.com/expo/examples/blob/master/with-firebase-storage-upload/App.js
async function uploadImageAsync(uri, creator) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(), 'images/' + creator + Date.now());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
}

export const subscribeToConversations = (username, updateConversationsCallback) => {
    const conversationsRef = collection(db, 'Conversations');
    const q = query(conversationsRef, where('users', 'array-contains', username));
    
    return onSnapshot(q, (querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
            const otherUsername = doc.data().users.find(u => u !== username);
            
            fetchUserProfile(otherUsername).then((otherUser) => {
                const messagesRef = collection(db, 'Conversations', doc.id, 'messages');
                const lastMessageQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));

                onSnapshot(lastMessageQuery, (messageSnapshot) => {
                    let latestMessage = null;
                    if (!messageSnapshot.empty) {
                        const latestMessageData = messageSnapshot.docs[0].data();
                        latestMessage = {
                            ...latestMessageData,
                            timestamp: latestMessageData.timestamp?.toDate(),
                        };
                    }

                    const conversationWithLatestMessage = {
                        id: doc.id,
                        otherUser,
                        latestMessage,
                    };

                    updateConversationsCallback(conversationWithLatestMessage);
                });
            });
        });
    });
};