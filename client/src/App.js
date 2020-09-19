import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
//redux
import { Provider } from 'react-redux';
//the store
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import Dashboard from './components/dashboard/Dashboard';
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-codentials/AddExperience';
import AddEducation from './components/add-codentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Chat from './components/chat/Chat';
import Stats from './components/stats/Stats';
import InPost from './components/Indevidual-Posts/InPosts';

import './App.scss';
// Check for token
//local storage- web storege
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and expertion
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Clear current Profile
		store.dispatch(clearCurrentProfile());
		// Redirect to login page
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Navbar />

						<Switch>
							<Route exact path="/" component={Landing} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/:handle" component={Profile} />
							<PrivateRoute exact path="/Dashboard" component={Dashboard} />
							<PrivateRoute exact path="/CreateProfile" component={CreateProfile} />
							<PrivateRoute exact path="/EditProfile" component={EditProfile} />
							<PrivateRoute exact path="/AddExperience" component={AddExperience} />
							<PrivateRoute exact path="/AddEducation" component={AddEducation} />
							<Route exact path="/not-found" component={NotFound} />
							<PrivateRoute exact path="/feed" component={Posts} />
							<PrivateRoute exact path="/Inposts/:id" component={InPost} />
							<PrivateRoute exact path="/post/:id" component={Post} />
							<PrivateRoute exact path="/Chat/:id" component={Chat} />
							<PrivateRoute exact path="/Stats" component={Stats} />
						</Switch>

						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
