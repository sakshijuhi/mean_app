import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import HomePage from './HomePage'
import './App.css';
import RegistrationForm from './pages/RegistrationForm';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import UserRoles from './pages/UserRoles';


class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path="/" component={HomePage}></Route>
					<Route path="/roles" component={UserRoles} ></Route>
					<Route path="/registration/:userid" component={RegistrationForm} ></Route>
					<Route path="/users" component={Users} ></Route>
					<Route path="/signin" component={SignInForm} ></Route>					

				</div>
			</Router >

		);

	}
}

export default App;