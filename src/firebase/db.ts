import { collection, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from './init';

export const createUser = async (email, data) => {
    try {
        await setDoc(doc(db, "users", email), data);
    } catch (e) {
        console.error("Error adding user: ", e);
    }
}

export const getUser = async email => {
    const userRef = doc(db, 'users', email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        console.log("Found user data for", email);
        return userSnap.data();
      } else {
        console.error("No such user!");
      }
}

export const updateUser = async (email, userData) => {
    try {
        const userRef = await doc(db, "users", email);
        await updateDoc(userRef, userData);
        console.log("Updated user with ID: ", userRef.id);
    } catch (e) {
        console.error("Error updating user: ", e);
    }
}