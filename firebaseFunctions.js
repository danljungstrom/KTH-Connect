import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    onSnapshot, serverTimestamp, setDoc,
    updateDoc,
    query,
    orderBy
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
    let postQuery = query(collection(db, 'Posts'),
        orderBy("timestamp", "desc"));
    return getDocs(postQuery)
        .then(querySnapshot => querySnapshot.docs.map(doc => (doc.id)))
}

export function subscribeToPostIDList(callback) {
    let postQuery = query(collection(db, 'Posts'),
        orderBy("timestamp", "desc"));
    return onSnapshot(postQuery, (querySnapshot) => {
        const postIDList = [];
        querySnapshot.forEach((doc) => {
            postIDList.push(doc.id);
        });
        callback(postIDList)
    });
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

async function addPost(content, creator, eventInfo = null) {
    let post = {
        content,
        creator,
        timestamp: serverTimestamp()
    }
    if(eventInfo) post = {...post, eventInfo}
    let ref = doc(collection(db, "Posts"));
    await setDoc(ref, post)
    return ref.id
}

export function addTextPost(content, creator) {
    return addPost(content, creator)
}

export function addEventPost(content, creator, title, startDate, endDate) {
    return addPost(content, creator, {title, startDate, endDate})
}