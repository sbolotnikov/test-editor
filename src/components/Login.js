import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, Redirect } from "react-router-dom"
import "./Login.scss";
export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [toRoot, setToRoot] = useState(false);
  if (toRoot === true) { return <Redirect to="/" /> }
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      // history.push("/test-editor/")
      setToRoot(true);
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <div className='mainContainer'>
      <div style={{ width: '98%', maxWidth: "400px" }}>
        <div className='registeCard'>
          <h2 className="header1">Log In
            <img src={process.env.PUBLIC_URL + "/icons/QuizLogo.svg"} alt="logo simple" className='logo' /> </h2>
          {error && <label className='alertStyle'>{error}</label>}
          <form onSubmit={handleSubmit}>
            <label className='headerStyle'  >Email
                    <input id="email" type="email" ref={emailRef} required />
            </label>
            <label className='headerStyle'  >Password
                    <input id="password" type="password" ref={passwordRef} required />
            </label>
            <button disabled={loading} className="btnNav" type="submit">
              Log In
            </button>
          </form>
          <div className="divStyle">
            <Link className="links" to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
        <div className="divStyle">
          Need an account? <Link className="links" to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}