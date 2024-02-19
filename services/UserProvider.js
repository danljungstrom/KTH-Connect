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
    try {
      const response = await fetch('https://us-central1-kth-connect.cloudfunctions.net/smtpAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.text(); // Get the text of the error response
        console.error('SMTP Auth failed with response:', errorResponse);
        throw new Error('SMTP Auth failed');
      }
  
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('SMTP Auth error:', error);
      return false;
    }
  };

  const signIn = async (username, password) => {
    console.log("Running sign in")
    const userData = await fetchUserData(username);
    const isAuthenticated = await auth(username, password);
    console.log(isAuthenticated);

    if(isAuthenticated){
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