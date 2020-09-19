const express = require('express');
//router-express router
const router = express.Router();
//gravatar-for the avatar
const gravatar = require('gravatar');
//bcrypt-to encrypt the password
const bcrypt = require('bcryptjs');
//jwt-to the web token
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');
const passport = require('passport');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load User model
const User = require('../../models/Users');

//Handling router requests
// @route          GET api/users//
// @description    Tests users route
// @access         Public
router.get('/', (req, res) =>
	res.json({
		msg: 'Users works',
	})
);
// @route          POST api/users/register
// @description    Register user
// @access         Public
router.post('/register', (req, res) => {
	//from validation->register
	const { errors, isValid } = validateRegisterInput(req.body);
	//check validation
	if (!isValid) {
		//return any errors with 400 status
		return res.status(400).json(errors);
	}
	//looking for a record that has the email that the user is trying to register with
	User.findOne({ email: req.body.email }).then(user => {
		//there is a user with that email
		if (user) {
			errors.email = 'Email allready exists';
			return res.status(400).json(errors);
		} //if there isn't then we need to create a user
		else {
			//req.body.-will come from the form
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar: req.body.avatar,
				password: req.body.password,
				role: req.body.role,
			});
			//hash the password
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) {
						throw err;
					}
					//save the hash password
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});
//making webtoken
// @route          POST api/users/login
// @description    Login User / Returning JWT Token
// @access         Public
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	//check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	//find the user by email
	//findOne- find one record
	User.findOne({ email }).then(user => {
		//Check for user
		if (!user) {
			errors.email = 'user not found';
			return res.status(404).json(errors);
		}
		//check password
		bcrypt.compare(password, user.password).then(isMatch => {
			//if it match we want to generate the token
			if (isMatch) {
				//user matched
				//create JWT payload
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar,
					role: user.role,
				};
				//Sign Token and the token will be available for an hour
				//payload- what we want to include in the token(user information).
				//key.secretOrKey-if we want to change the key or access it
				jwt.sign(payload, key.secretOrKey, { expiresIn: 3600 }, (err, token) => {
					//send the token
					res.json({
						success: true,
						//bearer is a certain type of token
						token: 'Bearer ' + token,
					});
				});
			} else {
				//if not matched
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});
// @route   		GET api/users/current
// @description    	Return current user
// @access  		Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) =>
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
	})
);
module.exports = router;
//module.exports-making the object avilable outside of the file
