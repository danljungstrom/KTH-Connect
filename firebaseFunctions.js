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

const postsRef = collection(db, "Posts")
const postQuery = query(postsRef, orderBy("timestamp", "desc"))

function postRef(postID) {
    return doc(db, 'Posts', postID)
}

export function subscribeToPostChange(postID, callback) {
    return onSnapshot(postRef(postID), callback);
}

export function likePost(postID, username) {
    return updateDoc(postRef(postID), {
        likes: arrayUnion(username)
    });
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

export function subscribeToPostIDList(callback) {
    return onSnapshot(postQuery, (querySnapshot) => {
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

async function addPost(content, creator, campus, eventInfo = null) {
    let post = {
        content,
        creator,
        campus,
        timestamp: serverTimestamp()
    }
    if(eventInfo) post = {...post, eventInfo}
    let ref = doc(collection(db, "Posts"));
    await setDoc(ref, post)
    return ref.id
}

export function addTextPost(content, creator, campus) {
    return addPost(content, creator, campus)
}

export function addEventPost(content, creator, campus, title, startDate, endDate) {
    return addPost(content, creator, campus, {title, startDate, endDate})
}