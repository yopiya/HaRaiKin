import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs,doc } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_eF69gJ-A9TMMf3xBByqWr1Z2huc10Zs",
  authDomain: "my-project-1101193.firebaseapp.com",
  projectId: "my-project-1101193",
  storageBucket: "my-project-1101193.appspot.com",
  messagingSenderId: "929471605156",
  appId: "1:929471605156:web:3a1ae529481c435c82b931",
  measurementId: "G-NYPS9XPQ4R"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const auth = getAuth();
export { firestore, collection, getDocs,doc };
  
  
/*
import firebase from 'firebase/app';
import 'firebase/auth';

// นำเข้าค่าต่างๆจาก Firebase config ของคุณ
const firebaseConfig = {
  apiKey: "AIzaSyA_eF69gJ-A9TMMf3xBByqWr1Z2huc10Zs",
  authDomain: "my-project-1101193.firebaseapp.com",
  projectId: "my-project-1101193",
  storageBucket: "my-project-1101193.appspot.com",
  messagingSenderId: "929471605156",
  appId: "1:929471605156:web:3a1ae529481c435c82b931",
  measurementId: "G-NYPS9XPQ4R"
};

// ตรวจสอบว่า Firebase ยังไม่ถูกเรียกใช้งาน
if (!firebase.apps.length) {
  // กำหนดค่า Firebase config
  firebase.initializeApp(firebaseConfig);
}

// สร้างอ็อบเจกต์ Firebase auth
const auth = firebase.auth();

export { auth };
*/