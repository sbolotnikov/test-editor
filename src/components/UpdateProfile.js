import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, Redirect } from "react-router-dom"
import Cloudinary from './Cloudinary';
import Footer from "./Footer";

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const userNameRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail, updateUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [toRoot, setToRoot] = useState(false);
  const [userURL, setUserURL] = useState(currentUser.photoURL);
  const getImgUrl = (url) => {
    document.querySelector("#userURL").childNodes[1].value = url;
    setUserURL (url)
    console.log(userURL)
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }
    if ((userNameRef.current.value !== currentUser.displayName) || (userURL !== currentUser.photoURL)) {
      promises.push(updateUser(userNameRef.current.value, userURL))
    }
    Promise.all(promises)
      .then(() => {
        setToRoot(true);
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (toRoot === true) { return <Redirect to="/dashboard" /> }
  return (
    <div className='mainContainer'>
      <div style={{ width: '98%', maxWidth: "400px", marginTop: '5%' }}>
        <div className='registeCard' >
          <h2 className="header1">Update Profile
          {(userURL!=null) && <img src={userURL} alt="logo simple" className='logo' />}</h2>
          {error && <label className='alertStyle'>{error}</label>}
          <form onSubmit={handleSubmit}>
            <label className='headerStyle'  >User's Name (keep it shorter then 20 symbols please)
                <input id="userName" type="text" ref={userNameRef} defaultValue={currentUser.displayName} placeholder="Leave blank to keep the same" />
            </label>
            <label className='headerStyle' id="userURL" >User's picture link
                <input type="text" onChange={(e)=>{setUserURL(e.target.value)}} defaultValue={currentUser.photoURL} />
              <Cloudinary style={{ width: "200px", objectFit: "cover", margin: "10px" }} getImgUrl={getImgUrl} />
            </label>
            <label className='headerStyle'  >Email
              <input id="email" type="email" ref={emailRef} required defaultValue={currentUser.email} />
            </label>
            <label className='headerStyle'  >Password
              <input id="password" type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
            </label>
            <label className='headerStyle'  >Password Confirmation
              <input id="password-confirm" type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
            </label>
            <button disabled={loading} className="testNav" style={{ width: '100%', margin: '2% auto' }} type="submit">
              Update
            </button>
          </form>
        </div>
        <div className="divStyle">
          <Link to="/dashboard" className="links" >Cancel</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}