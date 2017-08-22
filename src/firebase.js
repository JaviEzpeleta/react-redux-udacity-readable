import firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyDm305zrtCXAlGNN2gcy9qiqFWF14r3O-A',
  authDomain: 'readabledb.firebaseapp.com',
  databaseURL: 'https://readabledb.firebaseio.com',
  projectId: 'readabledb',
  storageBucket: 'readabledb.appspot.com',
  messagingSenderId: '561259044933'
}
firebase.initializeApp(config)
export default firebase
