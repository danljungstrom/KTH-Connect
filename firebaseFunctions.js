import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    onSnapshot,
    updateDoc
} from "firebase/firestore";
import {db} from "./config/firebaseConfig";

export function subscribeToPostChange(postID, callback) {
    return onSnapshot(doc(db, 'Posts', postID), callback);
}

export function likePost(postID, username) {
    return updateDoc(doc(db, "Posts", postID), {
        likes: arrayUnion(username)
    });
}

export function unlikePost(postID, username) {
    return updateDoc(doc(db, "Posts", postID), {
        likes: arrayRemove(username)
    });
}

export function fetchPostIDList() {
    return getDocs(collection(db, 'Posts'))
        .then(querySnapshot => querySnapshot.docs.map(doc => (doc.id)))
}

export function attendEvent(postID, username) {
    return updateDoc(doc(db, "Posts", postID), {
        "eventInfo.attending": arrayUnion(username)
    });
}

export function unAttendEvent(postID, username) {
    return updateDoc(doc(db, "Posts", postID), {
        "eventInfo.attending": arrayRemove(username)
    });
}

export function commentOnPost(postID, username, comment) {
    return updateDoc(doc(db, "Posts", postID), {
        comments: arrayUnion({
            author: username,
            comment,
            date: Date()
        })
    });
}