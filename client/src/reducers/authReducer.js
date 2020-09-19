import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';
//initialzing state
const initialState = {
	isAuthenticated: false,
	user: {},
};
//set the current user to the data that is in the payload if the payload is not empty
export default function(state = initialState, action) {
	//here we do the testing
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				//we dont change the state we create a copy using the ...
				...state,
				//check to see if it's not empty
				isAuthenticated: !isEmpty(action.payload),
				//fill he user from the payload that come from authActions user data
				user: action.payload,
			};
		default:
			return state;
	}
}
