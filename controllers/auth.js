const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.signin = function (req, res, next) {
	res.send({ token: tokenForUser(req.user)});
};
exports.signup = function(req, res, next) {
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({ error: "please provide both user and password" });
	};
	//see if a user with a the given email exists
	User.findOne({ email: email} , function (err, existingUser) {
		if (err) {
			return next(err);
		//if user not unique, return an error
		} if (existingUser) {
			return res.status(422).send({ error: "email in use"});
		}
		//if unique create and save user record
		const user = new User({ email: email, password: password});



		user.save(function(err){
			if(err) {
				return next(err);
			}
		//respond to request by indicating user was created
			res.json({ token: tokenForUser(user) });
		});
	});
};
