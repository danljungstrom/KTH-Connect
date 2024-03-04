import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useCampus } from './CampusProvider';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { selectedCampus } = useCampus();
  const [campusPosts, setCampusPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!selectedCampus) {
      setIsLoading(false);
      return;
    }

    if (campusPosts[selectedCampus.id]) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }

    const postsRef = collection(db, 'Posts');
    const q = query(postsRef, where('campus', '==', selectedCampus.name), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCampusPosts(prev => ({ ...prev, [selectedCampus.id]: newPosts }));
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedCampus]);

  const posts = selectedCampus ? campusPosts[selectedCampus.id] || [] : [];
  
  return (
    <PostContext.Provider value={{ posts, isLoading }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);