import axios from 'axios';

import {
	ADD_POST,
	GET_ERRORS,
	GET_POSTS,
	POST_LOADING,
	DELETE_POST,
	GET_POST,
	CLEAR_ERRORS,
	GET_INPOSTS,
} from './types';

//addpost is used to send post data to the backend
export const addPost = postData => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/posts', postData)
		.then(res =>
			dispatch({
				type: ADD_POST,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//getpost is used to get post data from the backend
export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios
		//the API
		.get('/api/posts')
		.then(res =>
			dispatch({
				type: GET_POSTS,
				payload: res.data,
			})
		)
		.catch(err =>
			//to get the errors we send it with null payload
			dispatch({
				type: GET_POSTS,
				payload: null,
			})
		);
};

//delete post is used to delete post from the backend
//takes the id beacuse it need to know which post to delete
export const deletePost = id => dispatch => {
	axios
		.delete(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_POST,
				payload: id,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//addlike is used to add a like to the likes array in the backend
//passed in the id to know which post to like
export const addLike = id => dispatch => {
	axios
		.post(`/api/posts/like/${id}`)
		//get all the posts to the func in the reducer
		.then(res => dispatch(getPosts()))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
//remove like is used to remove a like from the likes array in the backend
export const removeLike = id => dispatch => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//used to set the Loading variable to true in order to display the spinner
export const setPostLoading = () => {
	return {
		type: POST_LOADING,
	};
};

//getPost is used to get the specific post by id
export const getPost = id => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POST,
				payload: null,
			})
		);
};
//addComment is used to add a comment to the comment array
export const addComment = (id, commentData) => dispatch => {
	//to clean the errors before adding the comment
	dispatch(clearErrors());
	axios
		.post(`/api/posts/comment/${id}`, commentData)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
//deleteComment is used to delete the specific comment from the comments array
export const deleteComment = (id, commentId) => dispatch => {
	axios
		.delete(`/api/posts/comment/${id}/${commentId}`)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
//clean errors is used to dispatch and clear all the errors from the redux store.
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
