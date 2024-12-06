import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const StudySpotList = () => {
  const [studySpots, setStudySpots] = useState([]);

  useEffect(() => {
    const fetchStudySpots = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "studySpots"));
        const spots = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudySpots(spots);
      } catch (error) {
        console.error("Error fetching study spots: ", error);
      }
    };

    fetchStudySpots();
  }, []);

  return (
    <div>
      <h2>Study Spots</h2>
      <ul>
        {studySpots.map(spot => (
          <li key={spot.id}>{spot.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudySpotList;
