import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../spinner/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import './Dashboard.scss';

export class Dashboard extends Component {
	//getting the current profile
	//we want it to be called right away
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	//to delete the account
	onDeleteClick = e => {
		this.props.deleteAccount();
	};
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		//intializ var
		let dashboardContent;
		//if it still waiting for the information to show it will show a spinner or it's still loading
		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			//check if loggef in user has profile data
			//check to see if there is stuff in the object
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div className="DashboardContent">
						<p>
							Welcome
							<Link className="LinkName" to={`/profile/${profile.handle}`}>
								{user.name}
							</Link>
						</p>
						<ProfileActions />
						{profile.experience.length !== 0 ? <Experience experience={profile.experience} /> : null}
						{profile.education.length !== 0 ? <Education education={profile.education} /> : null}

						<div>
							<button style={{ marginTop: '40px' }} onClick={this.onDeleteClick}>
								Delete My Account
							</button>
						</div>
					</div>
				);
			} else if (user.role === 'Admin') {
				//if the user that logged in is the admin
				dashboardContent = (
					<div className="DashboardContent">
						<p> Welcome Admin</p>
						<p> What would you like to do?</p>
						<Link to="Stats">
							<button>View Statistics</button>
						</Link>
					</div>
				);
			} else {
				//user is ogged in but has no data in the profile and he needs to add
				dashboardContent = (
					<div className="DashboardContent">
						<p> Welcome {user.name}</p>
						<p> You have not yet setup a profile,please add some info</p>
						<Link to="/CreateProfile">Create profile </Link>
					</div>
				);
			}
		}
		return <div className="container">{dashboardContent}</div>;
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//in this case is the profile that we need and the authentication
//so we can access the auth and the profile using the this.props.auth/profile
const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});
//to connect between redux to the component
export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);
