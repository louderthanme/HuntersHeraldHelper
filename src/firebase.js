import { initializeApp } from "firebase/app";

//firestore
import { getFirestore, doc, setDoc, getDoc, updateDoc, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAZHKDV8ZZmdzOv7b9zZkmLAGoqsQcKnck",
  authDomain: "huntersheraldhelper.firebaseapp.com",
  projectId: "huntersheraldhelper",
  storageBucket: "huntersheraldhelper.appspot.com",
  messagingSenderId: "84889915687",
  appId: "1:84889915687:web:fea680337b2db327975902",
  measurementId: "G-81KBHQWY4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const setImageInFirestore = async (publicId, url) => {
    const docRef = doc(db, "huntersHerald", "currentImage");
    try {
        await setDoc(docRef, {
            publicId: publicId,
            url: url
        });
        return console.log("Image set in Firestore.");
    } catch (error) {
        console.error("Error setting image in Firestore:", error);
    }
}

export const getImageFromFirestore = async () => {
    const docRef = doc(db, "huntersHerald", "currentImage");
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data(); // Returns an object with publicId and url
        } else {
            console.log("No current image document found in Firestore.");
        }
    } catch (error) {
        console.error("Error fetching image from Firestore:", error);
    }
}

export const updateImageInFirestore = async (publicId, url) => {
    const docRef = doc(db, "huntersHerald", "currentImage");
    try {
        await updateDoc(docRef, {
            publicId: publicId,
            url: url
        });
    } catch (error) {
        console.error("Error updating image in Firestore:", error);
    }
}
