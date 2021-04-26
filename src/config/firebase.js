import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA5uNTBzxB_cwcaNof5ZOSIOusIbIOpjTw",
    authDomain: "react-slack-clone-6999c.firebaseapp.com",
    projectId: "react-slack-clone-6999c",
    storageBucket: "react-slack-clone-6999c.appspot.com",
    messagingSenderId: "897590857888",
    appId: "1:897590857888:web:e7805cd1c8f5b198c1f9c5",
    locationId: "asia-southeast2",
};
// Initialize Firebase
const _firebase = firebase.initializeApp(firebaseConfig);

export default firebase;

export {_firebase}
