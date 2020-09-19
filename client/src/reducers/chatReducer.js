import { GET_CHAT, POST_CHAT, DELETE_CHAT, EMPTY_CHAT } from '../actions/types';
//initialzing state
const initialState = {
	connectingID: '',
	otherID: '',
	chat: [],
};
//chat reducer -collection of actions and an initial state  for the chat
export default function(state = initialState, action) {
	switch (action.type) {
		//to get the chat
		case GET_CHAT:
			console.log(action.payload);
			return {
				...state,
				chat: action.payload.chat,
				connectingID: action.payload.ID,
				otherID: action.payload.connectingID,
			};
		//if the chat is empty
		case EMPTY_CHAT:
			return {
				...state,
			};
		case POST_CHAT:
			return {};
		case DELETE_CHAT:
			return {};
		default:
			return state;
	}
}
