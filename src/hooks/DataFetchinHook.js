import { useContext, useState, useEffect } from 'react';
import { FirebaseContext, AuthContext } from '../firebase/context';

const useGetFirebaseData = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { timesHistory } = useContext(FirebaseContext);

  useEffect(() => {
    console.log('useGetFirebaseData hook triggered');
    try {
      timesHistory().on('value', (snapshot) => {
        console.log('Firebase_Datafetch function triggered');
        if (snapshot.val() === null) {
          setFirebaseData([]);
          return;
        }
        // ok this way of filtering will work but come up with something
        // which will perform better at scale (10000+ users)
        const dataArray = Object.entries(snapshot.val())
          .map(([key, value]) => ({
            ...value,
            id: key,
          }))
          .filter((item) => item.user === currentUser.uid);
        // set the below to ENV DEV
        console.log('Data fetched via useGetFirebaseData hook: ');
        console.log(dataArray);
        setFirebaseData(dataArray);
      });
      // cleanup function
      return () => {
        console.log('Firebase_Datafetch cleanup function triggered');
        timesHistory().off();
      };
    } catch (error) {
      console.log(`Error happened: ${error}`);
    }
  }, [currentUser.uid, timesHistory]);

  return firebaseData;
};

export default useGetFirebaseData;
