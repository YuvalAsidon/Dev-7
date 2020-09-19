import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import './Experience.scss';
import { deleteEducation } from '../../actions/profileActions';
//to show from the AddEducation on ther screen of the dashboard
export class Education extends Component {
	//to delete the education from profileAction
	onDeleteClick = id => {
		this.props.deleteEducation(id);
	};
	//the page for the education
	render() {
		//we want to map through the array
		//moment- will format the data to what we want
		const education = this.props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment>-
					{edu.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
				</td>
				<td>
					<button onClick={() => this.onDeleteClick(edu._id)}>Delete</button>
				</td>
			</tr>
		));
		return (
			<div className="experience">
				<h4>Education Credentials</h4>
				<table>
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{education}</tbody>
				</table>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired,
};
//to connect between redux to the component
export default connect(
	null,
	{ deleteEducation }
)(Education);
