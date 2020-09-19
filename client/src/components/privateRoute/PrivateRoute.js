import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//if we want to access a route that we need authentication for it
//passed in the componenet that we e\what to show the auth and any other property that passed in
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			//checks if the auth is true (if the user is authenticated)
			//if its true it get the user to the page if not it will take the user to the login page
			auth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />
		}
	/>
);
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//so we can access the auth using the this.props.auth
const mapStateToProps = state => ({
	auth: state.auth,
});
//to connect between redux to the component
export default connect(mapStateToProps)(PrivateRoute);
