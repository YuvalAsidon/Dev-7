import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//it also async data so we need to wait for the back-end
//registerUser is used to send user data to the backend and register the new user
//and history is used for history push to login page.
export const registerUser = (userData, history) => dispatch => {
	//axios- http client that comunicate with the backend (AJAX call)
	axios
		//pass in the user data from the route
		.post('/api/users/register', userData)
		//if it's succsesful so we want to redicat the user to the login page
		.then(res => history.push('/login'))
		//if not then it will sent the information the the errorsReducer
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//login user is used to send user data to the backend and login the user by the token
//get user token
export const loginUser = userData => dispatch => {
	//axios- http client that comunicate with the backend (AJAX call)
	axios
		//pass in the user data from the route
		.post('/api/users/login', userData)
		.then(res => {
			//save to localstorage
			const { token } = res.data;
			// Set token to localstorage
			localStorage.setItem('jwtToken', token);
			//set token to auth header from utils.setAuthToken
			setAuthToken(token);
			//jwt_decode is used to decode the token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		//if not then it will sent the information the the errorsReducer
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//set logged user is used to set the user inside the authReducer
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};
//logoutUser is used to log out the user and remove the token from the localStorage
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false); //deletes token from axios
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
