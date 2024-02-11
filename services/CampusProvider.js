import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../services/UserProvider';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const CampusContext = createContext();

export const CampusProvider = ({ children, navigation}) => {
  const [campuses, setCampuses] = useState([]);
  const [selectedCampus, setCurrentCampus] = useState(null);
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Campuses'));
        const campusList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCampuses(campusList);
      } catch (error) {
        console.error("Error fetching campuses: ", error);
      }
    };

    fetchCampuses();
  }, []);

  setSelectedCampus = (campusId) => {
    const userRef = doc(db, 'Users', currentUser.username);
    setDoc(userRef, {
      selectedCampus: campusId
    }, { merge: true });
    setCurrentCampus(campuses[campusId-1]);
  }

  return (
    <CampusContext.Provider value={{ campuses, selectedCampus, setSelectedCampus }}>
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};