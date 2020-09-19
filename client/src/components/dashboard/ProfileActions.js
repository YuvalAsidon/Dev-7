import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileActions.scss';
//all the things the user can do
const ProfileActions = () => {
	return (
		<div
			className="ProfileActions"
			style={{
				display: 'flex',
				flexDirection: 'row',
			}}
		>
			<Link to="/EditProfile">
				<button> Edit profile</button>
			</Link>
			<Link to="/AddExperience">
				<button>Add Experience</button>
			</Link>
			<Link to="/AddEducation">
				<button>Add Education</button>
			</Link>
		</div>
	);
};

export default ProfileActions;
