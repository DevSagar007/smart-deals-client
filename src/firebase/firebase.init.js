// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9x_vc-ofNOSELezCWqRdhmcuCNDJiGMo",
  authDomain: "smart-deals-21ef0.firebaseapp.com",
  projectId: "smart-deals-21ef0",
  storageBucket: "smart-deals-21ef0.firebasestorage.app",
  messagingSenderId: "308833994129",
  appId: "1:308833994129:web:823d8ec70196c46785c630",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
