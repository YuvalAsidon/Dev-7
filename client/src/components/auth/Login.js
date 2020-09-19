import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';
import './Login.scss';

export class Login extends Component {
	//replacte our fields in the website
	state = {
		email: '',
		password: '',
		errors: {},
	};
	//executed after the first render only on the client side and in there it checks if the authentiation is true then it will take the user to the dashboard page
	componentDidMount() {
		//checks to see if the user logged in
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	//when the commponent recives new proporties then it allows to call setState in this case if for the new properties there is an error it update the state with the error and also if there is the authentication it takes the user to the dashboard page
	componentWillReceiveProps(nextProps) {
		//if the user is authenticated
		if (nextProps.auth.isAuthenticated) {
			//redirect to dashboard
			this.props.history.push('/dashboard');
		}
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
		this.setState({ [name]: value });
	};
	//when a form is submitted we get from the input to the state the data and then to the DB
	onSubmit = e => {
		//we don't want the defult action
		e.preventDefault();
		//save from the state
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		//sent to backend
		//it wiil allow use the this.props.history to redirect within the loginuser action
		this.props.loginUser(userData);
	};
	render() {
		return (
			<div className="container">
				<div className="Login">
					<div className="title">Login</div>
					<form onSubmit={this.onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
						<label htmlFor="email">Email</label>
						<input value={this.state.email} name="email" onChange={this.onChange} id="email" type="text" />

						<label htmlFor="password">Password</label>
						<input
							value={this.state.password}
							name="password"
							onChange={this.onChange}
							id="password"
							type="password"
						/>

						<button>Login</button>
					</form>
					<span className="errors">{this.state.errors.name}</span>
					<span className="errors">{this.state.errors.password}</span>
					<span className="errors">{this.state.errors.password2}</span>
					<span className="errors">{this.state.errors.email}</span>
				</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//here we connect auth and errors to what we have in the state and the errors
//so we can access the auth and the errors using the this.props.auth/errors
const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});
//to connect between redux to the component
export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
