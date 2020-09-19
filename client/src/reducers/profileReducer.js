import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES, ADMIN_DELETE } from '../actions/types';
//initializing state
const initialState = {
	profile: null,
	//anarray of profiles
	profiles: null,
	//will be fetching profile, while its fetching it will be true and when its over it will be false
	loading: false,
};
//profile reducer is for certain actions related to the profile
export default function(state = initialState, action) {
	switch (action.type) {
		//if it still wait for the profile then it will send it to the spinner
		case PROFILE_LOADING:
			return {
				...state,
				loading: true,
			};
		//to get the profile that matched to the payload
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false,
			};
		//taking down the profile from the store
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null,
			};
		//get all the profiles
		case GET_PROFILES:
			return {
				...state,
				profiles: action.payload,
				loading: false,
			};
		//let the admin delete the profile
		case ADMIN_DELETE:
			return {
				...state,
				profiles: state.profiles.filter(profile => profile._id !== action.payload.id),
			};
		default:
			return state;
	}
}
