import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCPhGd5iZKiz-cSPMeY-MqDTg_wG0gGmjk",
    authDomain: "bartersystem-87735.firebaseapp.com",
    projectId: "bartersystem-87735",
    storageBucket: "bartersystem-87735.appspot.com",
    messagingSenderId: "763806121239",
    appId: "1:763806121239:web:03c5c4152c2721231a8b52"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();