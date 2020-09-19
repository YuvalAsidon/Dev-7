import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';
import './codentials.scss';

export class AddExperience extends Component {
	state = {
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		//the current so it will be grey if it is current
		current: false,
		description: '',
		errors: {},
		//if the user clicked the checkbox disable-true and the will blackout the 'to' filed
		disabled: false,
	};
	//onchange -when the value of an element has been changed.(to write in the box)
	//takes in an event parameter
	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	//when a form is submitted we get from the input to the state the data
	onSubmit = e => {
		//we don't want the defult action
		e.preventDefault();
		//save from the state
		const expData = {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description,
		};
		//sent to backend
		//it wiil allow use the this.props.history to redirecton to the profileAction
		this.props.addExperience(expData, this.props.history);
	};
	//check if the checkbox is clicked then it will toggle the disable and the current.
	onCheck = e => {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current,
		});
	};
	//componentWillReceiveProps allows to call setState
	//we listinig to a change in the errors
	componentWillReceiveProps(nextProp) {
		if (nextProp.errors) {
			this.setState({ errors: nextProp.errors });
		}
	}

	render() {
		const { errors } = this.state;
		console.log(errors);
		return (
			<div className="container">
				<div className="AddExperience">
					<Link to="/dashboard">
						<button style={{ margin: '3rem' }}>Go Back</button>
					</Link>
					<h1>Add Experience</h1>
					<p>Add any job or position that you have had in the past or current</p>
					<small>* required fields</small>
					<form onSubmit={this.onSubmit}>
						<div className="inputItem">
							<input
								type="text"
								placeholder="* Company"
								name="company"
								value={this.state.company}
								onChange={this.onChange}
							/>
							<span className="errors">{errors.company}</span>
						</div>
						<div className="inputItem">
							<input
								type="text"
								placeholder="* Job Title"
								name="title"
								value={this.state.title}
								onChange={this.onChange}
							/>
							<span className="errors">{errors.title}</span>
						</div>
						<div className="inputItem">
							<input
								type="text"
								placeholder="Location"
								name="location"
								value={this.state.location}
								onChange={this.onChange}
							/>
							<span className="errors">{errors.location}</span>
						</div>

						<div className="inputItem">
							<h6> From Date</h6>
							<input
								type="date"
								placeholder="date"
								name="from"
								value={this.state.from}
								onChange={this.onChange}
							/>
							<span className="errors">{errors.from}</span>
						</div>

						<div className="inputItem">
							<h6> To Date</h6>
							<input
								type="date"
								name="to"
								value={this.state.to}
								onChange={this.onChange}
								disabled={this.state.disabled ? 'disabled' : ''}
							/>
							<span className="errors">{errors.to}</span>
							<div style={{ marginBottom: '10px' }}>
								<input
									type="checkbox"
									name="current"
									value={this.state.current}
									checked={this.state.current}
									onChange={this.onCheck}
									id="current"
								/>
								<label htmlFor="current">Current Job</label>
							</div>
							<textarea
								placeholder="job description"
								name="description"
								value={this.state.description}
								onChange={this.onChange}
								error={errors.description}
								info="Tell us about the position"
							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<button>Submit</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired,
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
	{ addExperience }
)(withRouter(AddExperience));
