import React, { createContext, useContext, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { fetchSignInProfile } from './UserAPI';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const addUser = async (user) => {
    const userRef = doc(db, 'Users', user.username);
  
    try {
      await setDoc(userRef, {
        username: user.username,
        selectedCampus: null,
        givenName: user.givenName,
        familyName: user.familyName,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchUserData = async (username) => {
    return await fetchSignInProfile(username);
  };

  const auth = async (username, password) => {
    return true;
  }

  const signIn = async (username, password) => {
    const userData = await fetchUserData(username);

    //TODO Implement SMTP authentication
    if(await auth(username, password)){
      const userRef = doc(db, 'Users', username);
      const user = await getDoc(userRef);

      //User has used the app before
      if(user.exists()){
        setCurrentUser(user.data());
        return user.data();
      }
      //User has private profile
      else if(userData === null){
        return '404';
      }
      //User has public profile but has not used the app before
      else{
        const newUser = {username:username, selectedCampus: null, givenName: userData.givenName, familyName: userData.familyName};
        setCurrentUser(newUser);
        await addUser(newUser);
        return newUser;
      }
    }
    //Sign in failed
    else{
      if(userData === null){
        return 'failedAuthNoUser';
      }
      else{
        return 'failedAuth';
      }
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