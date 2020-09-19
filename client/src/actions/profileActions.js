import axios from 'axios';

import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER,
	GET_PROFILES,
	ADMIN_DELETE,
} from './types';

//getCurrentProfile  is used to get the current profile from the backend
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	//axios- http client that comunicate with the backend (AJAX call)
	axios
		//get data from the route
		.get('/api/profiles')
		//send te type of get profile with the data
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch(err =>
			//want to return empty object as the profile
			dispatch({
				type: GET_PROFILE,
				payload: {},
			})
		);
};

//createProfile is used to create a profile in the backend
export const createProfile = (profileData, history) => dispatch => {
	//axios- http client that comunicate with the backend (AJAX call)
	axios
		//pass in the profile data from the route
		.post('/api/profiles', profileData)
		//we want to redirect to dashborad
		.then(res => history.push('/dashboard'))
		.catch(err => {
			//send errors
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

//setProfileLoading is used to set the spinner when its true when it's loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	};
};

//clearCurrentProfile is used to remove the current profile from the redux store
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
};

//deleteAccount is used to delete the accountand the profile from the Backend
export const deleteAccount = () => dispatch => {
	//to show a messege o the screen if the user is sure and if he is then we delete and set the user to an empty object
	if (window.confirm('Are you sure? This can Not be undone!')) {
		axios
			.delete('/api/profiles')
			.then(res => {
				dispatch({
					type: SET_CURRENT_USER,
					payload: {},
				});
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				});
			});
	}
};
//deleteAccountAdmin is used to allow the Admin to delete any account in the app.
export const deleteAccountAdmin = id => dispatch => {
	if (window.confirm('Are you sure? This can Not be undone!(ADMIN)')) {
		axios
			.delete(`/api/profiles/admin/${id}`)
			.then(res => {
				dispatch({
					type: ADMIN_DELETE,
					payload: id,
				});
			})
			.then(() => {
				window.location.reload();
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				});
			});
	}
};

//addExperience is used to add experience data to the backend
//get the expdata from AddExperience and history
export const addExperience = (expData, history) => dispatch => {
	axios
		//pass in the profile data from the route
		.post('/api/profiles/experience', expData)
		//if everything is ok it redirect to the dashboard page
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//addEducation is used to add education data to the backend
export const addEducation = (eduData, history) => dispatch => {
	axios
		//pass in the profile data from the route
		.post('/api/profiles/education', eduData)
		//if everything is ok it redirect to the dashboard page
		.then(() => history.push('/Dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
//deleteExperience is used to delete the experience from the backend
export const deleteExperience = id => dispatch => {
	axios
		//to delete the experience of certain id
		.delete(`/api/profiles/experience/${id}`)
		.then(res => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//deleteEducation is used to deleteEducation from the backend
export const deleteEducation = id => dispatch => {
	axios
		//to delete the education of certain id
		.delete(`/api/profiles/education/${id}`)
		.then(res => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//getProfiles is used to get all the profiles from the data base
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profiles/all')
		.then(res =>
			dispatch({
				type: GET_PROFILES,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILES,
				payload: null,
			})
		);
};

//getProfileByHandle is used to get a specific profile data by the user handle(name) from the backend
export const getProfileByHandle = handle => dispatch => {
	dispatch(setProfileLoading());
	axios
		//to get the data from that api
		.get(`/api/profiles/handle/${handle}`)
		.then(res => {
			//get that profile
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: null,
			})
		);
};
