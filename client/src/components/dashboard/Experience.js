import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import './Experience.scss';
import { deleteExperience } from '../../actions/profileActions';
//to show from the AddExperience on ther screen of the dashboard
export class Experience extends Component {
	//to delete exprience from profileAction
	onDeleteClick = id => {
		this.props.deleteExperience(id);
	};
	//the page for the exprience
	render() {
		//we want to map through the array
		//moment- will format the data to what we want
		const experience = this.props.experience.map(exp => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment>-
					{exp.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
				</td>
				<td>
					<button onClick={() => this.onDeleteClick(exp._id)}>Delete</button>
				</td>
			</tr>
		));
		return (
			<div className="experience">
				<h4>Experience Credentials</h4>
				<table>
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{experience}</tbody>
				</table>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired,
};
//to connect between redux to the component
export default connect(
	null,
	{ deleteExperience }
)(Experience);
