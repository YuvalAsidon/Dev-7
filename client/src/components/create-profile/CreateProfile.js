import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../generalstyles/form.scss';
//when there is a profile but without any data
export class CreateProfile extends Component {
	state = {
		//it will toggle
		displaySocialInputs: false,
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
		errors: {},
	};
	//componentWillReceiveProps allows to call setState here it's becuase of errors
	//we listinig to a change in the errors
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	//onchange -when the value of an element has been changed.(to write in the box)
	//takes in an event parameter
	onChange = e => {
		//we don't want the defult action
		e.preventDefault();
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	//when a form is submitted we get from the input to the state the data to the DB
	onSubmit = e => {
		//to pervent the default
		e.preventDefault();
		//save the data that the user put it in the var
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram,
		};
		//sent to backend
		//it wiil allow use the this.props.history to redirect
		this.props.createProfile(profileData, this.props.history);
	};
	render() {
		const { errors, displaySocialInputs } = this.state;
		let socialInputs;
		//if the toggle is on the true
		if (displaySocialInputs) {
			socialInputs = (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<input
						placeholder="Twitter profile URL"
						name="twitter"
						value={this.state.twitter}
						onChange={this.onChange}
					/>
					<span>{errors.twitter}</span>
					<input
						placeholder="Facebook profile URL"
						name="facebook"
						value={this.state.facebook}
						onChange={this.onChange}
					/>
					<span>{errors.facebook}</span>
					<input
						placeholder="LinkedIn profile URL"
						name="linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
					/>
					<span>{errors.linkedin}</span>
					<input
						placeholder="Youtube profile URL"
						name="youtube"
						value={this.state.youtube}
						onChange={this.onChange}
					/>
					<span>{errors.youtube}</span>
					<input
						placeholder="Instagram profile URL"
						name="instagram"
						value={this.state.instagram}
						onChange={this.onChange}
					/>
					<span>{errors.instagram}</span>
				</div>
			);
		}
		// Select options for status
		const options = [
			{ label: '*Select Proffesional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' },
		];
		//to select the options from options array
		const selectOptions = options.map(option => (
			<option key={option.label} value={option.value}>
				{option.label}
			</option>
		));

		return (
			<div className="container">
				<div className="form">
					<Link to="/dashboard">
						<button style={{ margin: '3rem' }}>Go Back</button>
					</Link>
					<div>
						<h1>Create Your Profile</h1>
					</div>

					<div>
						<p>Let's get some information to make your profile stand out</p>
					</div>

					<div>
						<small> * required fields</small>
					</div>

					<form onSubmit={this.onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
						<input
							className="form-input"
							placeholder="* Profile handle"
							name="handle"
							value={this.state.handle}
							onChange={this.onChange}
						/>
						<div className="form-description">
							<span className="form-span">
								"A unique handle for your profile URL. Your full name,company name,nickname"
							</span>
							<span className="errors">{errors.handle}</span>
						</div>

						<select className="form-input" name="status" value={this.state.status} onChange={this.onChange}>
							{selectOptions}
						</select>
						<div className="form-description">
							<span className="form-span">Give us an idea where you are at your career</span>
							<span className="errors">{errors.status}</span>
						</div>

						<input
							className="form-input"
							placeholder="Company"
							name="company"
							value={this.state.company}
							onChange={this.onChange}
						/>
						<div className="form-description">
							<span className="form-span">could be your own company or one you work for</span>
							<span className="errors">{errors.company}</span>
						</div>

						<input
							className="form-input"
							placeholder="Website"
							name="website"
							value={this.state.website}
							onChange={this.onChange}
						/>
						<div className="form-description">
							<span className="form-span">Could be your own or company website</span>
							<span className="errors">{errors.website}</span>
						</div>
						<input
							className="form-input"
							placeholder="Location"
							name="location"
							value={this.state.location}
							onChange={this.onChange}
						/>
						<div className="form-description">
							<span className="form-span">City and area</span>
							<span className="errors">{errors.location}</span>
						</div>
						<input
							className="form-input"
							placeholder="Skills"
							name="skills"
							value={this.state.skills}
							onChange={this.onChange}
						/>
						<div className="form-description">
							<span className="form-span">
								Please use comma seperated value [eg, HTML,CSS,JavaScript,PHP]
							</span>
							<span className="errors">{errors.skills}</span>
						</div>
						<input
							className="form-input"
							placeholder="Github Username"
							name="githubusername"
							value={this.state.githubusername}
							onChange={this.onChange}
						/>
						<div className="form-description">
							<span className="form-span">
								if you want your latest repos and a Github link,include your username
							</span>
							<span className="errors">{errors.githubusername}</span>
						</div>
						<textarea
							className="form-input"
							placeholder="A short bio of yourself"
							name="bio"
							value={this.state.bio}
							onChange={this.onChange}
						/>
						<div className="form-description">
							<span className="form-span">Tell us a little about yourself</span>
							<span className="errors">{errors.bio}</span>
						</div>
						<button
							type="button"
							onClick={() => {
								this.setState(curr => ({
									//it will toggle the display
									displaySocialInputs: !curr.displaySocialInputs,
								}));
							}}
						>
							Add Social Network Links
						</button>
						{socialInputs}
						<button style={{ marginBottom: '5rem' }}>Submit</button>
					</form>
				</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//here we connect profile from the DB to the state.profile that we have
//so we can access the profile and the errors using the this.props.profile/errors
const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors,
});
//to connect between redux to the component
export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(CreateProfile));
