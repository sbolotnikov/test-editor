import React from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import './App.scss';
// Components
import Signup from "./components/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Logout from "./components/Logout"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import DirectTestPage from "./components/DirectTestPage"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
//Pages
import testPage from './pages/testPage';
import makeTest from './pages/makeTest';

function App() {

  return (
    <Router>
      <AuthProvider>
          <Nav />
          <Footer />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute exact path="/create" component={makeTest} />
            <Route exact path="/test" component={testPage} />
            <Route path="/taketest/:id"><DirectTestPage /></Route>
          </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App