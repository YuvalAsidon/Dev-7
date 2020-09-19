const Validator = require('validator');
const isEmpty = require('./is-empty');
//will validate the login

module.exports = function validateLoginInput(data) {
	let errors = {};
	//will first change it to string and then check (even an empty string)
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	//check
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
