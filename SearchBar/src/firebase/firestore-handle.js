import { db } from "./firebase-config";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore"; 

export const AddLocation = async (id, name, phone, website) => {
    const docRef = doc(db, id, name);
    getDoc(docRef).then((doc) => {
            setDoc(docRef, {
                name: name,
                phone: phone,
                website: website
            });
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}