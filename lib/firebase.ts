import firebase, { getApps,initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,signOut } from "firebase/auth"
import { getFirestore,doc, setDoc  } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const apps = getApps
if (!apps.length) {
  initializeApp(firebaseConfig)
}

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const provider = new GoogleAuthProvider();

export const googleSignIn = async () => {
  let user = {
    uid: "",
    displayName: "",
    email: "",
    photoURL: "",
  }
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
      user = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }
    }).catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error)
      console.log(credential)
      console.log("cannot login")
    });

  return user
};

export const googleSignOut = async () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('sign out')
  }).catch((error) => {
    // An error happened.
    console.log("🚀 ~ file: firebase.ts ~ line 60 ~ signOut ~ error", error)
  });
};

export const registerUser = () => {
  let user = {
    uid: "",
    displayName: "",
    email: "",
    photoURL: ""
  }
  onAuthStateChanged(auth, async(usr) => {
  if (usr) {
    const uid = usr.uid;
    const displayName = usr.displayName!
    const email = usr.displayName!
    const photoURL = usr.photoURL!
    user = {
      uid,
      displayName,
      email,
      photoURL
    }
    await setDoc(doc(db, "users", uid), user);
    console.log(`Hello ${user.displayName} ! What’s going on?`)
  } else {
    console.log("User is not login yet.")
  }
});
}

export default firebase;