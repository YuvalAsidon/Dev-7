import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import './Profile.scss';
//the first part in view someones profile
export class ProfileHeader extends Component {
	render() {
		const { profile } = this.props;
		return (
			<div className="profileHeader">
				<div>
					<img
						style={{
							borderRadius: '200px',
							padding: '1.5rem',
							height: '300px',
							width: '300px',
						}}
						onError={e => {
							e.target.onerror = null;
							e.target.src =
								'http://www.gravatar.com/avatar/1dc94927731584333d25f0b7d5e0c814?s=200&r=pg&d=mm';
						}}
						src={profile.user.avatar}
						alt=""
					/>
				</div>

				<div className="profileHeader-name">
					<h1 style={{ fontSize: '3rem' }}>{profile.user.name}</h1>
					<p>
						{profile.status}
						{//is the user have company
						isEmpty(profile.company) ? null : <span>{profile.company}</span>}
					</p>
				</div>

				<div style={{ padding: '1rem' }}>
					{//if the user put location
					isEmpty(profile.location) ? null : <p>{profile.location}</p>}
				</div>

				<div>
					{//if the user put website
					isEmpty(profile.website) ? null : (
						<a href={profile.website} rel="noopener noreferrer" target="_blank">
							<i className="fas fa-globe" />
						</a>
					)}
				</div>

				<div className="profileHeader-social">
					<div>
						{isEmpty(profile.social && profile.social.twitter) ? null : (
							<a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
								<i className="fab fa-twitter fa-2x" />
								twitter
							</a>
						)}
					</div>
					<div>
						{isEmpty(profile.social && profile.social.facebook) ? null : (
							<a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
								<i class="fab fa-facebook" />
							</a>
						)}
					</div>
					<div>
						{isEmpty(profile.social && profile.social.linkedin) ? null : (
							<a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
								<i class="fab fa-linkedin" />
							</a>
						)}
					</div>
					<div>
						{isEmpty(profile.social && profile.social.youtube) ? null : (
							<a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
								<i class="fab fa-youtube" />
							</a>
						)}
					</div>
					<div>
						{isEmpty(profile.social && profile.social.instagram) ? null : (
							<a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
								<i class="fab fa-instagram" />
							</a>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileHeader;
