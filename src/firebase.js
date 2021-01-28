import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAhgF2PXPc27RV0Nrjt0tBH_Oh3UwZQwME',
  authDomain: 'lecellio-584f8.firebaseapp.com',
  databaseURL: 'https://lecellio-584f8.firebaseio.com',
  projectId: 'lecellio-584f8',
  storageBucket: 'lecellio-584f8.appspot.com',
  messagingSenderId: '270401526941',
  appId: '1:270401526941:web:b05d12d73bf6486d060874',
};
firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
