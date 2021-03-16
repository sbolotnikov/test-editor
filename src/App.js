import React from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import Signup from "./components/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import DirectTestPage from "./components/DirectTestPage"
import Nav from "./components/Nav"
//Pages
import testPage from './pages/testPage';
import makeTest from './pages/makeTest';

function App() {

  return (

    <Router>
      <AuthProvider>
        <Nav />
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute exact path="/create" component={makeTest} />
          <Route exact path="/test" component={testPage} />
          <Route path="/taketest/:id"><DirectTestPage /></Route>
          {/* https://sbolotnikov.github.io/test-editor/#/taketest/RtqxyubO57LToxbaOzpj */}
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App