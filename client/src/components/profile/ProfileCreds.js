import React, { Component } from 'react';
import Moment from 'react-moment';
import './Profile.scss';

export class ProfileCreds extends Component {
	render() {
		const { experience, education } = this.props;
		//show the experience for the profile
		//moment is formatting the way the data is shown
		const expItems = experience.map(exp => (
			<li key={exp._id} className="profileCreds-exp">
				<h4>{exp.company}</h4>
				<p>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment>
					{exp.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
				</p>
				<p>
					<strong>Position:</strong>
					{exp.title}
				</p>
				<p>
					{exp.location === '' ? null : (
						<span>
							<strong>Location:</strong>
							{exp.location}
						</span>
					)}
				</p>
				<p>
					{exp.description === '' ? null : (
						<span>
							<strong>Description:</strong>
							{exp.description}
						</span>
					)}
				</p>
			</li>
		));
		//will show the education items for the profile
		const eduItems = education.map(edu => (
			<li key={edu._id} className="profileCreds-edu">
				<h4>{edu.school}</h4>
				<p>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment>
					{edu.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
				</p>
				<p>
					<strong>Degree:</strong>
					{edu.degree}
				</p>

				<p>
					<strong>Field of Study:</strong>
					{edu.fieldofstudy}
				</p>

				<p>
					{edu.description === '' ? null : (
						<span>
							<strong>Description:</strong>
							{edu.description}
						</span>
					)}
				</p>
			</li>
		));

		return (
			<div className="profileCreds">
				<div className="title">
					<h3>Experience</h3>
					<h3>Education</h3>
				</div>
				<div className="body">
					{expItems.length > 0 ? <ul>{expItems}</ul> : <p>No Experience Listed</p>}
					{eduItems.length > 0 ? <ul>{eduItems}</ul> : <p>No Education Listed</p>}
				</div>
			</div>
		);
	}
}

export default ProfileCreds;
