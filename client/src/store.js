import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const initialState = {};
const middleware = [thunk];
//to create the redux store
/*the store takes in:
	 the root of the reducers, 
	 the inital state that we have
	 and the enhancer that there we apply the middleware,and the chrom extension.
*/
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		//redux dev tools
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);
export default store;
