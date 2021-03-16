import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, Redirect } from "react-router-dom"
import Cloudinary from './Cloudinary';

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const userNameRef= useRef()
  const userURLRef= useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail, updateUser} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [toRoot, setToRoot] = useState(false);
  const getImgUrl = (url) => {
    document.querySelector("#userURL").childNodes[1].value=url;
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
    if ((userNameRef.current.value!== currentUser.displayName)||(userURLRef.current.value!== currentUser.photoURL)){
      promises.push(updateUser(userNameRef.current.value, userURLRef.current.value))
    }
    Promise.all(promises)
      .then(() => {
        // history.push("/test-editor/")
        setToRoot(true);
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    console.log('Value: ' + process.env.REACT_APP_CLOUDNAME);
    console.log('Value: ' + process.env.REACT_APP_CLOUD_PRESET);
  },[])

  if (toRoot===true){return <Redirect to="/" />}
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="userName">
                <Form.Label>User's Name</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={userNameRef}
                  defaultValue={currentUser.displayName}
                  placeholder="Leave blank to keep the same"  />
              </Form.Group>
              
                               
                            
              <Form.Group id="userURL">
                <Form.Label>User's picture link</Form.Label>
                <Form.Control 
                type="text" 
                ref={userURLRef}
                defaultValue={currentUser.photoURL}
                placeholder="Leave blank to keep the same"  />
                 <Cloudinary style={{width: "200px", objectFit: "cover", margin: "10px"}} getImgUrl={getImgUrl} />
              </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
      </div>
    </Container>
  )
}