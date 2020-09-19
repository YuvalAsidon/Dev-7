import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';
import './Comment.scss';
//the form that the comment need to be in
export class CommentForm extends Component {
	state = {
		text: '',
		errors: {},
	};
	//when a form is submitted we get from the input to the state the data to the DB
	onSubmit = e => {
		//to prevent the defualt action
		e.preventDefault();
		const { user } = this.props.auth;
		const { postID } = this.props;
		//add a new comment
		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		//pass the new post to the action and then the reducer
		this.props.addComment(postID, newComment);
		//set the state to nothing
		this.setState({ text: '' });
	};
	//onchange -when the value of an element has been changed.
	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	//componentWillReceiveProps allows to call setState for errors
	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			console.log(newProps.errors);
			this.setState({ errors: newProps.errors });
		}
	}
	render() {
		const { errors } = this.state;
		return (
			<div>
				<div>Make a comment...</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '1.5rem',
					}}
				>
					<form className="commentForm" onSubmit={this.onSubmit}>
						<textarea
							placeholder="Reply to post"
							name="text"
							value={this.state.text}
							onChange={this.onChange}
						/>
						<button>Submit</button>
					</form>
					<span className="errors">{errors.text}</span>
				</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
CommentForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	postID: PropTypes.string.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//so we can access the auth and the errors using the this.props.errors/auth
const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth,
});
//to connect between redux to the component
export default connect(
	mapStateToProps,
	{ addComment }
)(CommentForm);
