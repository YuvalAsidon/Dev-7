import React, { Component } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../spinner/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileActions';
import './Profile.scss';

export class Profile extends Component {
	//after everything is rendred it will get the profile the user loggeed with by the handle
	componentDidMount() {
		const { handle } = this.props.match.params;
		//if it's exist
		if (handle) {
			this.props.getProfileByHandle(handle);
		}
	}
	//checks if the profile not found so it will take the user to the notFound page
	componentWillReceiveProps(nextProps) {
		//check if there isn't then it will redirect to not found page
		if (nextProps.profile.profile === null && this.props.profile.loading) {
			this.props.history.push('/not-found');
		}
	}
	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;
		//if the information the the website still gathering then it will show the spinner
		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div className="profileDisplay">
					<Link to="/profiles" style={{ padding: '5rem' }}>
						<button>Back To Profiles</button>
					</Link>

					<ProfileHeader profile={profile} />
					<div className="combine">
						<ProfileAbout profile={profile} />
						<ProfileCreds education={profile.education} experience={profile.experience} />
					</div>

					{//if they have github user name
					profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null}
				</div>
			);
		}
		return <div className="container">{profileContent}</div>;
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfileByHandle: PropTypes.func.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//in this case it's the profile
//so we can access the profile using the this.props.profile
const mapStateToProps = state => ({
	profile: state.profile,
});
//to connect between redux to the component Profile
export default connect(
	mapStateToProps,
	{ getProfileByHandle }
)(Profile);
