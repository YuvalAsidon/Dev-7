const express = require('express');
//allows to create our models and schemas easily and add layer of methods
const mongoose = require('mongoose');
//to get from the body data
const bodyParser = require('body-parser');
//import the routs
const users = require('./routes/API/usersAPI');
const profiles = require('./routes/API/profileAPI');
const posts = require('./routes/API/postsAPI');

const chat = require('./routes/API/chatAPI');

//the main authentication module
const passport = require('passport');

//Set up and create express app
const app = express();

//DB Config
const db = require('./config/keys').mongoURI;

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
//in a json way to get the data
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
	.connect(db)
	//if it connected
	.then(() => {
		console.log('MongoDB connected');
	})
	//if it's not been connected
	.catch(err => console.log(err));
//Passport Middlerware
app.use(passport.initialize());
//Passport Config
require('./config/passport.js')(passport);

//Use Routes - Initilaze routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profiles', profiles);
app.use('/api/chat', chat);

//Listen for requests from port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));
