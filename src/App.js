import React from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import './App.scss';
// Components
import Signup from "./components/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import About from "./components/About"
import Logout from "./components/Logout"
import RedirectMain from "./components/RedirectMain"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import DirectTestPage from "./components/DirectTestPage"
import Nav from "./components/Nav"

//Pages
import testPage from './pages/testPage';
import makeTest from './pages/makeTest';
require('dotenv').config();
function App() {
console.log("App.js is running",process.env.REACT_APP_FIREBASE_PROJECT_ID )
  return (
    <Router>
      <AuthProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={testPage} />
            <Route exact path="/redirect" component={RedirectMain} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/logout" component={Logout} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute exact path="/create" component={makeTest} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route path="/taketest/:id"><DirectTestPage /></Route>
          </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App