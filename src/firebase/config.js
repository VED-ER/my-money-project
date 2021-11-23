import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyDs-9zrUlDbKlbD1elz_egXAqz_ZogyHEU",
	authDomain: "mymoney-project-da5ae.firebaseapp.com",
	projectId: "mymoney-project-da5ae",
	storageBucket: "mymoney-project-da5ae.appspot.com",
	messagingSenderId: "393128159916",
	appId: "1:393128159916:web:3920420507aa3188ec8d09",
}

// init firebase

firebase.initializeApp(firebaseConfig)

// init service

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
