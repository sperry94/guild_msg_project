import * as firebase from "firebase/app"

import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAFkLfldso4y5CJGj8BNCoAv9r7Ukacrow",
  authDomain: "guild-msg-project.firebaseapp.com",
  databaseURL: "https://guild-msg-project.firebaseio.com",
  projectId: "guild-msg-project",
  storageBucket: "guild-msg-project.appspot.com",
  messagingSenderId: "88742455218",
  appId: "1:88742455218:web:602d0164baff3181bd66ab",
  measurementId: "G-WCV6QT9SZ5",
}

let innerFirebaseApp: firebase.app.App | undefined

export const firebaseApp = () =>
  innerFirebaseApp ||
  (innerFirebaseApp = firebase.initializeApp(firebaseConfig))

let innerFirebaseAuth: firebase.auth.Auth | undefined

export const firebaseAuth = () =>
  innerFirebaseAuth || (innerFirebaseAuth = firebaseApp().auth())
