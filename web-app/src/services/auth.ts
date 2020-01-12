import { createContext, useContext, useState, useEffect } from "react"
import { auth, User } from "firebase/app"
import { firebaseAuth } from "./firebase"

export const AuthContext = createContext<User | null | undefined>(undefined)

export const useAuthContext = () => useContext(AuthContext)

export const useAuthUpdate = () => {
  const [auth, setAuth] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    return firebaseAuth().onAuthStateChanged(setAuth, err => {
      console.error("An error occurred checking auth state", err)
      setAuth(null)
    })
  }, [])

  return auth
}

let innerGoogleAuthProvider: auth.GoogleAuthProvider | null = null

const googleAuthProvider = () =>
  innerGoogleAuthProvider ||
  (innerGoogleAuthProvider = new auth.GoogleAuthProvider())

export const signIn = () =>
  firebaseAuth()
    .signInWithRedirect(googleAuthProvider())
    .catch(err => {
      console.error("An error occurred logging in", err)
    })

export const signOut = () =>
  firebaseAuth()
    .signOut()
    .catch(err => {
      console.error("An error occurred logging out", err)
    })
