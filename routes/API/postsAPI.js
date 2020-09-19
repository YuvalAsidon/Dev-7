const express = require('express');
//express router
const router = express.Router();
//protect the route
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profiles');
// Validation
const validatePostInput = require('../../validation/post');

//Handling router requests
// @route          GET api/posts//
// @description    Tests posts route
// @access         Public
router.get('/', (req, res) => {
	//find all posts
	Post.find()
		//sort by the date
		.sort({ date: -1 })
		//get the results
		.then(posts => res.json(posts))
		//if there isn't any posts
		.catch(err => res.status(404).json({ nopostsFound: 'no posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
	//find by id
	Post.findById(req.params.id)
		.sort({ date: -1 })
		//get the results
		.then(post => res.json(post))
		.catch(err => res.status(404).json({ nopostFound: 'no post found with that ID' }));
});
// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	//check validation from validation->post
	if (!isValid) {
		//return any errors with 400 status
		return res.status(400).json(errors);
	}
	//create new post var
	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id,
	});
	//to save the new post
	newPost.save().then(post => res.json(post));
});
// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	//to make sure that the owner of the post can delete it
	Profile.findOne({ user: req.user.id }).then(profile => {
		//find the post
		Post.findById(req.params.id)
			.then(post => {
				//if it's not the admin and not the user then it's not authroized
				if (post.user.toString() !== req.user.id && req.user.role !== 'Admin') {
					return res.status(401).json({ notauthorized: 'User not authorized' });
				}
				//Delete
				post.remove().then(() => res.json({ success: true }));
			})
			.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	});
});
// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	//find the profile (user)
	Profile.findOne({ user: req.user.id }).then(profile => {
		//find the post
		Post.findById(req.params.id)
			.then(post => {
				//to check if the user already like the post (if the id is already there)
				//post.likes is an aaray
				if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
					return res.status(400).json({ alreadyliked: 'User already liked this post' });
				}

				// Add user id to likes array
				post.likes.unshift({ user: req.user.id });
				//save changes
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	});
});
// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	//find the profile and the user
	Profile.findOne({ user: req.user.id }).then(profile => {
		//find the post by id
		Post.findById(req.params.id)
			.then(post => {
				//if the user not in the array then he can't unlike he needs to like first
				if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
					return res.status(400).json({ notliked: 'You have not yet liked this post' });
				}

				// Get remove index
				const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

				// Splice out of array
				post.likes.splice(removeIndex, 1);

				// Save
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	});
});
// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	// Check Validation
	if (!isValid) {
		// If any errors, send 400 with errors object
		return res.status(400).json(errors);
	}
	//find the post by id
	Post.findById(req.params.id)
		.then(post => {
			//add new comment object- from the form
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id,
			};

			// Add to comments array
			post.comments.unshift(newComment);

			// Save
			post.save().then(post => res.json(post));
		})
		//ERROR
		.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});
// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			// Check to see if comment exists
			if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
				return res.status(404).json({ commentnotexists: 'Comment does not exist' });
			}

			// Get remove index
			const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

			// Splice comment out of array
			post.comments.splice(removeIndex, 1);
			//save changes
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});

module.exports = router;
//module.exports-making the object avilable outside of the file
