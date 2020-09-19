import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import { getProfiles } from '../../actions/profileActions';
import { deleteAccountAdmin } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';
import './ProfileStyle.scss';

export class Profiles extends Component {
	//getting all the profiles
	componentDidMount() {
		this.props.getProfiles();
	}

	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;
		//if the data still comming then it will show the spinner
		if (profiles === null || loading) {
			profileItems = <Spinner />;
		} else {
			//check to see if there are any profiles
			if (profiles.length > 0) {
				//show every profile
				profileItems = profiles.map(profile => (
					<ProfileItem
						key={profile._id}
						profile={profile}
						auth={this.props.auth}
						delete={this.props.deleteAccountAdmin}
					/>
				));
			} else {
				profileItems = <h4>No profiles found...</h4>;
			}
		}
		return (
			<div
				className="container"
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<div className="profileContainer">
					<h1 className="profieTitle">Developer profiles</h1>
					<p className="profieTitle-p">Browse and connect with developers</p>
				</div>
				<div>{profileItems}</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	deleteAccountAdmin: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//in this case id profile and authentication
//so we can access the auth and the profile using the this.props.auth/profile
const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});
//to connect between redux to the component editProfile
export default connect(
	mapStateToProps,
	{ getProfiles, deleteAccountAdmin }
)(Profiles);
