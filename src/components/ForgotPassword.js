import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import "./Login.scss";
export default function ForgotPassword() {
  // page handles forgot password case
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <div className='mainContainer'>
      <div style={{ width: '98%', maxWidth: "400px" }}>
        <div className='registeCard'>
          <h2 className="header1">Password Reset
            <img src={process.env.PUBLIC_URL + "/icons/QuizLogo.svg"} alt="logo simple" className='logo' /></h2>
          {error && <label className='alertStyle'>{error}</label>}
          {message &&<label className='successStyle'>{message}</label> }
          <form onSubmit={handleSubmit}>
            <label className='headerStyle'  >Email
                    <input id="email" type="email" ref={emailRef} required />
            </label>
            <button disabled={loading} className="btnNav" type="submit">
              Reset Password
            </button>
          </form>
          <div className="divStyle">
            <Link to="/login" className="links" >Login</Link>
          </div>
        </div>
        <div className="divStyle">
          Need an account? <Link to="/signup"className="links" >Sign Up</Link>
        </div>
      </div>
    </div>
  )
}