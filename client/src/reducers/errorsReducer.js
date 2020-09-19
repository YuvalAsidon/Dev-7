import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};
//for the errors if there are
export default function(state = initialState, action) {
	switch (action.type) {
		//to get the errors
		case GET_ERRORS:
			//it will sent back the errors
			return action.payload;
		//to clear the errors we returning an empty object
		case CLEAR_ERRORS:
			return {};
		default:
			return state;
	}
}
