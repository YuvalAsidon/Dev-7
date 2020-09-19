import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import { withRouter } from 'react-router-dom';

export class Register extends Component {
	//replacte our fields in the website
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		role: '',
		avatar: '',
		errors: {},
	};
	//executed after the first render only on the client side and in there it checks if the authentiation is true then it will take the user to the dashboard page
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	//when the commponent recives new proporties then it allows to call setState in this case if for the new properties there is an error it update the state with the error
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	//onchange -when the value of an element has been changed.(to write in the box)
	//takes in an event parameter
	onChange = e => {
		const { name, value } = e.target;
		//we don't want the defult action
		e.preventDefault();
		//set the state to what the event in the target
		this.setState({ [name]: value });
	};
	//when a form is submitted we get from the input to the state the data and then to the DB
	onSubmit = e => {
		//we don't want the defult action
		e.preventDefault();
		//save from the state
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
			avatar: this.state.avatar,
		};
		//sent to backend (to authAction)
		//it wiil allow use the this.props.history to redirect within the registeuser action
		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		return (
			<div className="container">
				<div className="Login">
					<div className="title">Sign-up</div>
					<form onSubmit={this.onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
						<label htmlFor="email">Email</label>
						<input value={this.state.email} name="email" onChange={this.onChange} id="email" />
						<label htmlFor="name">name</label>
						<input value={this.state.name} name="name" onChange={this.onChange} id="name" />
						<label htmlFor="password">Password</label>
						<input
							value={this.state.password}
							name="password"
							onChange={this.onChange}
							id="password"
							type="password"
						/>
						<label htmlFor="password2">Password2</label>
						<input
							value={this.state.password2}
							name="password2"
							onChange={this.onChange}
							id="password2"
							type="password"
						/>
						<label htmlFor="avatar">avatar</label>
						<input value={this.state.avatar} name="avatar" onChange={this.onChange} id="avatar" />
						<button>Register</button>
						<span>{this.state.errors.name}</span>
						<span>{this.state.errors.password}</span>
						<span>{this.state.errors.password2}</span>
						<span>{this.state.errors.email}</span>
						<span>{this.state.errors.avatar}</span>
					</form>
				</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//here we connect auth and errors to what we have in the state and the errors
//so we can access the auth and the errors using the this.props.auth/errors
const mapStatetoProps = state => ({
	auth: state.auth, //state is the rootreducer
	errors: state.errors,
});
//to connect between redux to the component
export default connect(
	mapStatetoProps,
	{ registerUser }
)(withRouter(Register));
