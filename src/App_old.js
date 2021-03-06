import React, { useState } from 'react';
import fire from './firebase';
import LoginContext from './utils/LoginContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// Components
import Header from './components/navbar/Header';
import Signup from './components/signup/SignupCard';
import Login from './components/login/LoginCard';
import testPage from './pages/testPage';
import makeTest from './pages/makeTest';
import CreateQuizForm from './components/quiz-creation/CreateQuizForm';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [emailVerified, setEmailVerified] = useState(false);

	fire.auth().onAuthStateChanged((user) => {
		user ? setIsLoggedIn(true) : setIsLoggedIn(false);
		user.emailVerified ? setEmailVerified(true) : setEmailVerified(false);
		return;
	});

	console.log('logged in?', isLoggedIn);

	return (
		<Router>
			<LoginContext.Provider
				value={{
					isLoggedIn,
					setIsLoggedIn,
					emailVerified,
					setEmailVerified,
				}}>
				<Header />
				{!isLoggedIn || !emailVerified ? (
					<Switch>
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/login" component={Login} />
						<Route
							exact
							path="/create"
							component={makeTest}
							// component={CreateQuizForm}
						/>
						<Route exact path="/test" component={testPage}/>
					</Switch>
				) : (
					<Switch>
						{/* <h1> Hello World!</h1> */}
						<Route
							exact
							path="/create"
							component={makeTest}
							// component={CreateQuizForm}
						/>
						<Route exact path="/test" component={testPage}/>
					</Switch>
					
				)}
			</LoginContext.Provider>
		</Router>
	);
}

export default App;
