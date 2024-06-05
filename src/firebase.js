import firebase from "firebase/app"
import "firebase/auth"
import "firebase/analytics"
import "firebase/firestore";
// import axios from "axios";
// export const getEnvs = async() =>{
//   axios.get("https://pwa-budget-tracker.onrender.com/api/proxy_envs") 
//   .then((response)=> {   
//     // fixing CORS
//     return response.data;
//     // res.header('Access-Control-Allow-Origin', '*');
//     // res.send(response.data);     
// }).catch((error)=> {
//   console.log(error);
//   return error;
// }); 
// }
//  let envs= await getEnvs()
//  console.log(envs)
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}
export const auth = app.auth()
export default app