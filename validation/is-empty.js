// to see if the error is empty or null
//because its an object and not a string we created the function on our own
const isEmpty = value =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;
