const Validator = require('validator');
const isEmpty = require('./is-empty');
//will validate the profile
module.exports = function validateProfileInput(data) {
	//initialize errors object
	let errors = {};
	//will first change it to string and then check (even an empty string)
	//if it null or undefined it will be am empty string
	data.handle = !isEmpty(data.handle) ? data.handle : '';
	data.status = !isEmpty(data.status) ? data.status : '';
	data.skills = !isEmpty(data.skills) ? data.skills : '';
	//then check with the validator
	if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle = 'handles needs to be between 2 and 40 characters';
	}

	if (Validator.isEmpty(data.handle)) {
		errors.handle = 'Profile handle is required';
	}

	if (Validator.isEmpty(data.status)) {
		errors.status = 'Status field field is required';
	}
	if (Validator.isEmpty(data.skills)) {
		errors.skills = 'Skills field field is required';
	}
	//vakidator checks URL
	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = 'Not a vaild URL';
		}
	}
	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = 'Not a vaild URL';
		}
	}
	if (!isEmpty(data.twitter)) {
		if (!Validator.isURL(data.website)) {
			errors.twitter = 'Not a vaild URL';
		}
	}
	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = 'Not a vaild URL';
		}
	}
	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = 'Not a vaild URL';
		}
	}
	//we return the errors if there is and if the errors is empty then the is valid is true
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
