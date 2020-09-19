import { ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST } from '../actions/types';
//initializing state
const initialState = {
	posts: [],
	post: {}, //single post
	loading: false,
};
//post reducer is for certain actions related to the post
export default function(state = initialState, action) {
	switch (action.type) {
		//to get the posts
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			};

		//delete the post
		case DELETE_POST:
			return {
				...state,
				//find the post id and by using filter to remove that post
				posts: state.posts.filter(post => post._id !== action.payload),
			};
		//if it still wait for the post then it will send it to the spinner
		case POST_LOADING:
			return {
				...state,
				loading: true,
			};
		//to add a post
		case ADD_POST:
			return {
				//antyhing that in the state
				...state,
				//add in the new data with the other posts
				posts: [action.payload, ...state.posts],
			};
		//get a post
		case GET_POST:
			return {
				//anything that in the state
				...state,
				post: action.payload,
				loading: false,
			};

		default:
			return state;
	}
}
