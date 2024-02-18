import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import missingProfileImage from '../assets/missing-profile-image.png';

//User fetching with backup functionality
export const fetchUserProfile = async (username) => {
    try {
      const response = await fetch(`https://api.kth.se/api/profile/1.1/${username}`);
      if (response.ok) {
        const userJson = await response.json();
        userJson.image = { uri: userJson.image };
        return userJson;
      } 
      else if (response.status === 404) {
        const userRef = doc(db, 'Users', username);
        const userDoc = await getDoc(userRef);
        const user = userDoc.data();
      
        return {
          username: user.username,
          givenName: user.givenName,
          familyName: user.familyName,
          image: missingProfileImage,
          url: "backup"
        }
      }
      else{
        console.error('Failed to fetch user profile:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  //Sign in used for login, since we have to check for a and don't want a backup user.
  export const fetchSignInProfile = async (username) => {
    try {
      const response = await fetch(`https://api.kth.se/api/profile/1.1/${username}`);
      if (response.ok) {
        const userJson = await response.json();
        return userJson;
      }
      else{
        console.error('Failed to fetch user profile:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };