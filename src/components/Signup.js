import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, Redirect } from "react-router-dom"
import Footer from "./Footer";
import "./Login.scss";
export default function Signup() {

  // component to create new user using AuthContext
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {currentUser, signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [toRoot, setToRoot] = useState(false);
  if (toRoot === true) { return <Redirect to="/" /> }
  if (currentUser) { return <Redirect to="/redirect" /> }
  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Passwords should be at least 6 symbols long")
    }
    try {
      setError("")
      setLoading(true)
      signup(emailRef.current.value, passwordRef.current.value);
      setToRoot(true);

    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <div className='mainContainer'>
      <div style={{ width: '98%', maxWidth: "400px" }}>
        <div className='registeCard'>

          <h2 className="header1">Sign Up
            <img src={process.env.PUBLIC_URL + "/icons/QuizLogo.svg"} alt="logo simple" className='logo' /></h2>
          {error && <label className='alertStyle'>{error}</label>}
          <form onSubmit={handleSubmit}>
            <label className='headerStyle'  >Email
                    <input id="email" style={{ width: '100%', margin: '4% auto' }} type="email" ref={emailRef} required />
            </label>
            <label className='headerStyle'  >Password
                    <input id="password" style={{ width: '100%', margin: '4% auto' }} type="password" ref={passwordRef} required />
            </label>
            <label className='headerStyle'  >Password Confirmation
                    <input id="password-confirm" style={{ width: '100%', margin: '4% auto' }} type="password" ref={passwordConfirmRef} required />
            </label>
            <button disabled={loading} className="testNav" style={{ width: '100%', margin: '4% auto' }} type="submit">
              Sign Up
            </button>
          </form>

        </div>
        <div className="divStyle">
          Already have an account? <Link className="links" to="/login">Log In</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}