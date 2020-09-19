import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import './ProfileStyle.scss';
//in the developers every profile item is this
export class ProfileItem extends Component {
	render() {
		const { profile, auth } = this.props;

		return (
			<div className="profileCard">
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<img
						src={profile.user.avatar}
						alt=""
						style={{ height: '200px', width: '200px' }}
						onError={e => {
							e.target.onerror = null;
							e.target.src =
								'http://www.gravatar.com/avatar/1dc94927731584333d25f0b7d5e0c814?s=200&r=pg&d=mm';
						}}
					/>
					{auth.isAuthenticated && auth.user.id !== profile.user._id ? (
						<Link className="chat-button" to={`/Chat/${profile.user._id}`}>
							<i class="fas fa-comments" />
						</Link>
					) : null}
				</div>

				<div className="profileCard-details">
					<h3>{profile.user.name}</h3>
					<p>
						{profile.status}
						{isEmpty(profile.company) ? null : <span>at {profile.company}</span>}
					</p>
					<p>{isEmpty(profile.location) ? null : <span>{profile.location}</span>}</p>
					<Link to={`/profile/${profile.handle}`}>
						<button>View Profile </button>
					</Link>
					{auth.isAuthenticated && auth.user.role === 'Admin' ? (
						<button onClick={() => this.props.delete(profile.user._id)}>Delete account</button>
					) : null}
				</div>

				<div className="profileCard-skills">
					<h4>Skill Set</h4>
					<ul>
						{//to get only 4 skills
						profile.skills.slice(0, 4).map((skill, index) => (
							<li key={index}> {skill}</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.bool.isRequired,
};

export default ProfileItem;
