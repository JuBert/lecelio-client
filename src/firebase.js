import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'XXXX-XXXX-XXXX-XXXX',
  authDomain: 'XXXX-XXXX-XXXX-XXXX',
  databaseURL: 'XXXX-XXXX-XXXX-XXXX',
  projectId: 'XXXX-XXXX-XXXX-XXXX',
  storageBucket: 'XXXX-XXXX-XXXX-XXXX',
  messagingSenderId: 'XXXX-XXXX-XXXX-XXXX',
  appId: 'XXXX-XXXX-XXXX-XXXX',
};
firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
