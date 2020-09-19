import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';
import { clearCurrentProfile } from '../../actions/profileActions';
import './Navbar.scss';
//the navbar and it need to change if the user signed in or not
export class Navbar extends Component {
	//to logout from the user
	onLogoutClick = e => {
		//to prevern the defualt
		e.preventDefault();
		//clear the profile
		this.props.clearCurrentProfile();
		//to logout the profile
		this.props.logoutUser();
	};
	render() {
		const { isAuthenticated, user } = this.props.auth;
		//if the user is logged in
		const authLinks = (
			<div>
				<Link className="link" to="/Profiles">
					Developers
				</Link>
				<Link className="link" to={`/Inposts/${user.id}`}>
					My Posts
				</Link>
				<Link className="link" to="/feed">
					Post Feed
				</Link>
				<Link className="link" to="/Dashboard">
					Dashboard
				</Link>
				<Link to="/" onClick={this.onLogoutClick}>
					<img
						src={user.avatar}
						alt={user.name}
						onError={e => {
							e.target.onerror = null;
							e.target.src =
								'http://www.gravatar.com/avatar/1dc94927731584333d25f0b7d5e0c814?s=200&r=pg&d=mm';
						}}
						style={{
							width: '25px',
							height: '25px',
							marginRight: '5px',
							borderRadius: '1000px',
						}}
						title="You must have a Gravater connected to your email to display and image"
					/>
					Logout
				</Link>
			</div>
		);
		//if there is just a guest
		const guestLinks = (
			<div>
				<Link className="link" to="/Profiles">
					Developers
				</Link>
				<Link className="link" to="/register">
					Sign Up
				</Link>
				<Link className="link" to="/login">
					Login
				</Link>
			</div>
		);

		return (
			<div className="nav">
				<div>
					<Link className="link" to="/">
						Dev7
					</Link>
				</div>

				{isAuthenticated ? authLinks : guestLinks}
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//the authentication the the state one
//so we can access the auth using the this.props.auth
const mapStateToProps = state => ({
	auth: state.auth,
});
//to connect between redux to the component
export default connect(
	mapStateToProps,
	{ logoutUser, clearCurrentProfile }
)(Navbar);
