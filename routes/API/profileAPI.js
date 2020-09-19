const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//Load Input Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

//Load prfile model
const Profile = require('../../models/Profiles');
//Load user model
const User = require('../../models/Users');
//Handling router requests
// @route          GET api/profile//
// @description    Tests profile route
// @access         Public
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	//fetch the current user profile
	const errors = {};

	Profile.findOne({ user: req.user.id })
		//take from user
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			//if there isn't a profile
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			//if there is it will send the profile
			res.json(profile);
		})
		.catch(err => res.status(404).json({ profile: 'there is no profile for this user' }));
});
// @route  		   GET api/profile/all
// @description    Get all profiles
// @access  	   Public
router.get('/all', (req, res) => {
	const errors = {};
	//we fetching more then one record
	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			//check to see that there is profiles
			if (!profiles) {
				errors.noprofiles = 'There are no profiles';
				return res.status(404).json(errors);
			}
			res.json(profiles);
		})
		.catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});
// @route   	   GET api/profile/handle/:handle
// @description    Get profile by handle
// @access  	   Public
router.get('/handle/:handle', (req, res) => {
	const errors = {};
	//find the handle
	Profile.findOne({ handle: req.params.handle })
		//populate with some of the user stuff
		.populate('user', ['name', 'avatar'])
		//check the profile
		.then(profile => {
			//checkes to see if there isn't no profile
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		//catch any errors
		.catch(err => res.status(404).json(err));
});
// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({ user: req.params.user_id })
		//to bring the name and the avatar to include in the profile
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	//checks to see if its validate profile
	const { errors, isValid } = validateProfileInput(req.body);
	//check validation
	if (!isValid) {
		//return any errors with 400 status
		return res.status(400).json(errors);
	}
	//get fields
	const profileFields = {};
	profileFields.user = req.user.id;
	//checks to see if it's was sent from the form
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.status) profileFields.status = req.body.status;
	if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
	// Skills - Spilt into array by the ','
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}
	//Social
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

	Profile.findOne({ user: req.user.id }).then(profile => {
		//update profile information
		if (profile) {
			//if profile exist update
			Profile.findOneAndUpdate(
				{ user: req.user.id },
				//set all the fields
				{ $set: profileFields },
				//if there is new information it will update it
				{ new: true }
			)
				//then it will send the profile
				.then(profile => res.json(profile));
		}
		//create profile information
		else {
			//create
			//checking if handle exist
			Profile.findOne({ handle: profileFields.handle }).then(profile => {
				if (profile) {
					errors.handle = 'That handle already exists';
					res.status(400).json(errors);
				}
				//not existes, save profile
				new Profile(profileFields).save().then(profile => res.json(profile));
			});
		}
	});
});
// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
	//checking tin the validation->experience
	const { errors, isValid } = validateExperienceInput(req.body);
	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}
	//to find the profile by id
	Profile.findOne({ user: req.user.id }).then(profile => {
		//to create new experience
		const newExp = {
			title: req.body.title,
			company: req.body.company,
			location: req.body.location,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description,
		};
		// Add to exp array
		//to add to the beginning we do the unshift
		profile.experience.unshift(newExp);
		//then save to the new profile with the experience and we get the profile
		profile.save().then(profile => res.json(profile));
	});
});
// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateEducationInput(req.body);

	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id }).then(profile => {
		//to create new education
		const newEdu = {
			school: req.body.school,
			degree: req.body.degree,
			fieldofstudy: req.body.fieldofstudy,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description,
		};

		// Add to exp array
		//to add to the beginning we do the unshift
		profile.education.unshift(newEdu);
		//then save to the new profile with the education and we get the profile
		profile.save().then(profile => res.json(profile));
	});
});
// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	//find the user
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			// Get remove index
			//profile.experience is the array
			const removeIndex = profile.experience
				.map(item => item.id)
				//to match it to what ever passed in :exp_id
				.indexOf(req.params.exp_id);

			// Splice out of array- what index to remove and how much(1)
			profile.experience.splice(removeIndex, 1);

			// Save the changes
			profile.save().then(profile => res.json(profile));
		})
		.catch(err => res.status(404).json(err));
});
// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			// Get remove index
			const removeIndex = profile.education
				.map(item => item.id)
				//to match it to what ever passed in :edu_id
				.indexOf(req.params.edu_id);

			// Splice out of array- what index to remove and how much(1)
			profile.education.splice(removeIndex, 1);

			// Save the changes
			profile.save().then(profile => res.json(profile));
		})
		.catch(err => res.status(404).json(err));
});
// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOneAndRemove({ user: req.user.id }).then(() => {
		User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
	});
});
// @route   DELETE api/admin
// @desc    Delete the admin
// @access  Private
router.delete('/admin/:id', (req, res) => {
	console.log('the id is:', req.params.id);
	Profile.findOneAndRemove({ user: req.params.id }).then(() => {
		User.findOneAndRemove({ _id: req.params.id }).then(() => res.json({ success: true }));
	});
});

module.exports = router;
//module.exports-making the object avilable outside of the file
