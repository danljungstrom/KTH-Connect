import React, { createContext, useContext, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const addUser = async (username) => {
    const userRef = doc(db, 'Users', username);
  
    try {
      await setDoc(userRef, {
        username: username,
        selectedCampus: null
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const signIn = async (username, password) => {
    const userRef = doc(db, 'Users', username);
    const user = await getDoc(userRef);

    if(user.exists()){
      setCurrentUser(user.data());
      return user.data();
    }
    else{
      const newUser = {username:username, selectedCampus: null};
      setCurrentUser(newUser);
      await addUser(username);
      return newUser;
    }
  }

  const signOut = () => {
    setCurrentUser(null);
  }

  return (
    <UserContext.Provider value={{ currentUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};