import { db } from "./firebase-config";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

export const addLocation = async (name, location, noise) => {
    const docRef = doc(db, id, name);
    getDoc(docRef).then((doc) => {
        setDoc(docRef, {
            name: name,
            location: location,
            noise: noise
        });
    }).catch((error) => {
        console.log("Error adding document:", error);
    });
}

export const removeLocation = async (id, name) => {
    const location = await getDoc(doc(db, id, name))
    if (location.exists()) {
        await deleteDoc(doc(db, id, name))
    } else {
        console.log("Location could not be found")
    }
}

export const getLocation = async (id, name) => {
    const location = await getDoc(doc(db, id, name))
    if (location.exists()) {
        return location.data()
    } else {
        console.log("Location could not be found")
    }
}