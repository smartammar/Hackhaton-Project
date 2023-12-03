import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWL7pu0E_ItKUhwm7jnjpsSpRt_RCW6X4",
  authDomain: "next-project-21.firebaseapp.com",
  projectId: "next-project-21",
  storageBucket: "next-project-21.appspot.com",
  messagingSenderId: "254626964322",
  appId: "1:254626964322:web:79b059f70ef8a00915023b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authentication = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function registered(email, password, fullname, age) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const docRef = await addDoc(collection(db, "users", ""), {
      fullname: fullname,
      email: email,
      age: age,
    });
    alert("Successfully Registered!");
  } catch (e) {
    alert(e.message);
  }
}

function loggin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

async function postAd(title, image) {
  try {
    const url = await uploadImage(image);
    await addDoc(collection(db, "ads"), {
      title,
      imageUrl: url,
    });
    alert("Ad Posted Succesfully");
  } catch (e) {
    alert(e.message);
  }
}

async function uploadImage(image) {
  try {
    const storageRef = ref(storage, "ads/" + image.name);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (e) {
    alert(e.message);
  }
}

async function getAds() {
  const querySnapshot = await getDocs(collection(db, "ads"));
  const ads = [];
  querySnapshot.forEach((doc) => {
    ads.push(doc.data());
  });
  return ads;
}

export { getAds, postAd, loggin, registered };
