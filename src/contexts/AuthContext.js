import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
    // console.log(name, email,password, url)
    // return auth.createUser({
    //    email: email,
    //    password: password, 
    //    displayName:name,
    //    photoURL:url})

    // try {
    //   const userNewAuth = await firebase.auth().createUserWithEmailAndPassword(email, password);
    //   var user = {
    //     name: "Raja",
    //     phone: "779797329",
    //     address: "474 Mercer Drive",
    //     uid: userNewAuth.uid,
    //     email: userNewAuth.email
    //   }
    //   writeUserData(user)

    // } catch (error) {
    //   console.log(error.message)
    // }
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function updateUser(name, url) {
    console.log("setting profile " + name + url);
    console.log(currentUser)
    return currentUser.updateProfile({
      displayName: name,
      photoURL: url
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      console.log("error on Profile update")// An error happened.
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}