import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, Redirect } from "react-router-dom"
import "./Login.scss";
export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [toLogin, setToLogin] = useState(false);
  if (toLogin === true) { return <Redirect to="/login" /> }
  async function handleLogout() {
    setError("")

    try {
      await logout()
      setToLogin(true);
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <div className='mainContainer'>
      <div style={{ width: '98%', maxWidth: "400px", marginTop:'6%' }}>
        <div className='registeCard' style={{padding:'.75em'}}>
          <h2 className="header1">Dashboard
          <img src={process.env.PUBLIC_URL + "/icons/QuizLogo.svg"} alt="logo simple" className='logo' /></h2>
          {error && <label className='alertStyle'>{error}</label>}
          <h6 className="divStyle"> <strong>Welcome,</strong> {currentUser.displayName}</h6>
          <h6 className="divStyle">  <strong>Email:</strong> {currentUser.email} </h6>
          <img style={{ width: '60%', margin:'3% 15%' }} src={currentUser.photoURL > "" ? currentUser.photoURL : process.env.PUBLIC_URL + "/icons/defaultUser.svg"} alt="profile pic" />
          <Link to="/update-profile">
            <button className="testNav" style={{width:'100%', margin:'2% auto'}}>
              Update Profile
              </button>
          </Link>
          <Link to="/test">
            <button className="testNav" style={{width:'100%', margin:'2% auto'}}>
              Take Tests
              </button>
          </Link>
          <Link to="/create">
            <button className="testNav" style={{width:'100%', margin:'2% auto'}}>
              Manage Tests
              </button>
          </Link>
        </div>
        <div className="divStyle">
          <div className='linkText' onClick={handleLogout}>
            Log Out
        </div>
        </div>
      </div>
    </div>
  )
}