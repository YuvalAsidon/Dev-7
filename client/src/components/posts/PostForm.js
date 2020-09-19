import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import './Posts.scss';
export class PostForm extends Component {
	state = {
		text: '',
		errors: {},
	};
	//when a form is submitted we get from the input to the state the data and then to the DB
	onSubmit = e => {
		//ti pewvent the default
		e.preventDefault();
		const { user } = this.props.auth;
		//creating new post variable and putting the information inside
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		//adding the post with the new post var
		this.props.addPost(newPost);
		//set the state to nothing
		this.setState({ text: '' });
	};
	//onchange -when the value of an element has been changed and it save the change
	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	//allows to call setState
	componentWillReceiveProps(newProps) {
		//if there is errors
		if (newProps.errors) {
			console.log(newProps.errors);
			this.setState({ errors: newProps.errors });
		}
	}
	render() {
		const { errors } = this.state;
		return (
			<div style={{ marginTop: '1.3rem' }}>
				<div>Say something...</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '1.5rem',
					}}
				>
					<form className="postForm" onSubmit={this.onSubmit}>
						<textarea
							placeholder="Create a post"
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
PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//in this case is the errors and the authentication
//so we can access the auth and the errors using the this.props.auth/errors

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth,
});
//to connect between redux to the component postItem
export default connect(
	mapStateToProps,
	{ addPost }
)(PostForm);
