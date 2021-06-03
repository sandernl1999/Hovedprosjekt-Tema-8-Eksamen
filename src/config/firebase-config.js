import firebase from 'firebase';

const firebaseConfig = {
  //Forklaring på at de ikke er i en env-fil står forklart i env-filen i koden//
    measurementId: "G-G3D14K5ZPH",
    apiKey: "AIzaSyBcprAyw-vpJd7fh5E0RPhoPEuCzhLZTy0",
    authDomain: "mapbox-firebase-project.firebaseapp.com",
    projectId: "mapbox-firebase-project",
    storageBucket: "mapbox-firebase-project.appspot.com",
    messagingSenderId: "641858781681",
    appId: "1:641858781681:web:47241282935b38dce90450"
};
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;

export default fire;