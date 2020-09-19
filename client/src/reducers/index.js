import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import chatReducer from './chatReducer';
//reducer-collection of actions and an initial state
//combain all the reducers to one
export default combineReducers({
	auth: authReducer,
	errors: errorsReducer,
	profile: profileReducer,
	post: postReducer,
	chat: chatReducer,
});
