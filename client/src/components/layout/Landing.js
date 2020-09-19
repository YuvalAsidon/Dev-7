import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Landing.scss';
//the middle of the webside wich always changes
export class Landing extends Component {
	//executed after the first render only on the client side
	// and in there it checks if the authentiation is true then it will take the user to the dashboard page
	componentDidMount() {
		//checkksto see if the user logged in is so we redirect him to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	render() {
		return (
			<div className="container">
				<div className="landing">
					<div className="landing-form">
						<h1 style={{ letterSpacing: '3px' }}>Welcome to Dev-7</h1>
						<div>
							<Link to="/login">
								<button style={{ cursor: 'pointer' }} type="button">
									Login
								</button>
							</Link>
							<Link to="/register">
								<button style={{ cursor: 'pointer' }} type="button">
									Sign up
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Landing.propTypes = {
	auth: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//so we can access the auth using the this.props.auth
const mapStateToProps = state => ({
	auth: state.auth,
});
//to connect between redux to the component
export default connect(mapStateToProps)(Landing);
