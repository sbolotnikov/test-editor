import React, { useState } from "react"
import { Card, Button, Alert, Container} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, Redirect } from "react-router-dom"
export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [toLogin, setToLogin] = useState(false);
  if (toLogin===true){return <Redirect to="/login" />}
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
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", width:"100%" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <h6 className="text-center mb-4"> <strong>Display Name:</strong> {currentUser.displayName}</h6>
            <h6 className="text-center mb-4">  <strong>Email:</strong> {currentUser.email} </h6>
            <img style={{width:'70%', marginLeft:"15%",marginRight:"15%"}} src={currentUser.photoURL>"" ? currentUser.photoURL : process.env.PUBLIC_URL + "./images/defaultIcon.png"} alt="profile pic"/>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
          </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
        </Button>
        </div>
      </div>
    </Container>
  )
}