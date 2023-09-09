import { collection, doc, addDoc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from './init';

export const createUser = async user => {
    try {
        const userRef = await addDoc(collection(db,'users'), user);
        console.log("Created user with ID: ", userRef.id);
        return userRef.id;
    } catch (e) {
        console.error("Error adding user: ", e);
    }
}

export const getUser = async id => {
    const userRef = doc(db, 'users', id);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        console.log("User data:", userSnap.data());
        return userSnap.data();
      } else {
        console.error("No such user!");
      }
}

export const updateUser = async (id, userData) => {
    try {
        const userRef = await doc(db, "users", id);
        await updateDoc(userRef, userData);
        console.log("Updated user with ID: ", userRef.id);
    } catch (e) {
        console.error("Error updating user: ", e);
    }
}