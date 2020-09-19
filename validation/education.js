const Validator = require('validator');
const isEmpty = require('./is-empty');
//will validate the eduction
module.exports = function validateEducationInput(data) {
	let errors = {};
	//will first change it to string and then check (even an empty string)
	data.school = !isEmpty(data.school) ? data.school : '';
	data.degree = !isEmpty(data.degree) ? data.degree : '';
	data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
	data.from = !isEmpty(data.from) ? data.from : '';
	//check
	if (Validator.isEmpty(data.school)) {
		errors.school = 'School field is required';
	}

	if (Validator.isEmpty(data.degree)) {
		errors.degree = 'Degree field is required';
	}

	if (Validator.isEmpty(data.fieldofstudy)) {
		errors.fieldofstudy = 'Field of study field is required';
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = 'From date field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
