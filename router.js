const Auth = require('./controllers/auth'),
			passportService = require('./services/passport'),
			passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

module.exports = function(app) {
	app.get('/', requireAuth, function (req, res) {
		res.send({ message: '123abc' });
	});
	app.post('/signin', requireSignin, Auth.signin);
	app.post('/signup', Auth.signup);
}