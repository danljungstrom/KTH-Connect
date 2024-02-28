import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    onSnapshot, serverTimestamp, setDoc,
    updateDoc,
    query,
    orderBy, where
} from "firebase/firestore";
import {db} from "./config/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

async function addPost(content, creator, campus, eventInfo = null, image = null) {
    let post = {
        content,
        creator,
        campus,
        timestamp: serverTimestamp()
    }
    if(eventInfo) post = {...post, eventInfo}
    if(image) {
        let url = 'TODO' //await uploadImageAsync(image.source.uri)
        post = {...post, image: {source: url, width: image.width, height: image.height}}
    }
    let ref = doc(collection(db, "Posts"));
    await setDoc(ref, post)
    return ref.id
}

export function addTextPost(content, creator, campus) {
    return addPost(content, creator, campus)
}

export function addEventPost(content, creator, campus, title, startDate, endDate, image) {
    return addPost(content, creator, campus, {title, startDate, endDate}, image)
}

// From https://github.com/expo/examples/blob/master/with-firebase-storage-upload/App.js
async function uploadImageAsync(uri) {
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

    const fileRef = ref(getStorage(), 'images');
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
}