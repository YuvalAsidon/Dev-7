const express = require('express');
const router = express.Router();
const passport = require('passport');
const Chat = require('../../models/Chat');
const encrypt = require('../../validation/encrypt');
const decode = require('../../validation/decode');

//router get is a route used to get the chat between two userID's
router.get('/:id/:otherid', async (req, res) => {
	try {
		const chat1 = await Chat.findOne({
			otherID: req.params.otherid,
			ID: req.params.id,
		});
		const chat2 = await Chat.findOne({
			otherID: req.params.id,
			ID: req.params.otherid,
		});
		if (chat1) {
			chat1.chat.map(chat => {
				chat.text = decode(chat.text);
			});
			res.json(chat1);
		} else if (chat2) {
			chat2.chat.map(chat => {
				chat.text = decode(chat.text);
			});
			res.json(chat2);
		} else {
			res.json(null);
		}
	} catch (err) {
		console.log(err);
	}
});

//router post is a private route used to send chat item to the database
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	//find if the user1 he started the chat if so we get the id and the other id
	const chat1 = await Chat.findOne({
		otherID: req.body.otherID,
		ID: req.body.ID,
	});
	//find if the user2 he started the chat if so we get the id and the other id
	const chat2 = await Chat.findOne({
		otherID: req.body.ID,
		ID: req.body.otherID,
	});
	//if the user1 we go throgh the chat and encrypt it
	if (chat1) {
		req.body.chat.map(chat => {
			chat.text = encrypt(chat.text);
		});
		//then save the encryption
		chat1.chat = [...req.body.chat];
		chat1.save();
	}
	//if the user2 we go throgh the chat and encrypt it
	else if (chat2) {
		req.body.chat.map(chat => {
			chat.text = encrypt(chat.text);
		});
		//then save the encryption
		chat2.chat = [...req.body.chat];
		chat2.save();
	}
	//if non of them started we open a new object so the users can chat
	else {
		tempchat = req.body.chat.map(chat => {
			chat.text = encrypt(chat.text);
		});
		const newChat = new Chat({
			ID: req.body.connectingID,
			otherID: req.body.otherID,
			chat: tempchat,
		});
		//then save
		newChat
			.save()
			.then(post => res.json(post))
			.catch(err => console.log(err));
	}
});

//router delete is used to delete a chat item from the database
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id)
			.then(post => {
				if (post.user.toString() !== req.user.id) {
					return res.status(401).json({ notauthorized: 'User not authorized' });
				}

				post.remove().then(() => res.json({ success: true }));
			})
			.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	});
});

module.exports = router;
