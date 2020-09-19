import axios from 'axios';

//setAuthToken is used to add a token for every axios request for the server in order to give access to authorized user
// and also used to remove the token if the token does not exist.
//axios- fetch of react
const setAuthToken = token => {
	//check for the token if it exist
	if (token) {
		// Apply to every request
		axios.defaults.headers.common['authorization'] = token;
	} //if the token isnt exist
	else {
		// Delete auth header
		delete axios.defaults.headers.common['authorization'];
	}
};

export default setAuthToken;
