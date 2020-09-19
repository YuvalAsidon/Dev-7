const Validator = require('validator');
const isEmpty = require('./is-empty');
//will validate the posts
module.exports = function validatePostInput(data) {
	//initialzing errors object
	let errors = {};
	//will first change it to string and then check (even an empty string)
	data.text = !isEmpty(data.text) ? data.text : '';
	//check
	if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
		errors.text = 'post must be between 10 and 300 characters';
	}

	if (Validator.isEmpty(data.text)) {
		errors.text = 'text field is required';
	}
	//returning the errors if there is and the isValid will come back true if the errors is empty
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
