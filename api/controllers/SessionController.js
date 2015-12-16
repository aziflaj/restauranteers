/**
 * SessionController
 *
 * @description :: Manage sessions, authentication and registration of new users
 */

var bcrypt = require('bcrypt');

module.exports = {
	create: function(req, res) {
		console.log('session');
		if (req.session.authenticated) {
			console.log('authenticated');
			// TODO: redirect to homepage
		} else {
			return res.view('login');
		}
	},

	store: function(req, res) {
		var user = {
			username: req.body.username,
			password: req.body.password
		};

		User.attemptLogin(user, function(error, user) {
			if (error) {
				console.log(error);
				return res.send(error); //TODO: redirect to login
			} else {
				console.log('User found');
				req.session.user_id = user.id;
				req.session.authenticated = true;
				return res.send({
					session_id: req.session.user_id,
					session_auth: req.session.authenticated,
					user: user
				});
			}
		});
	},

	logout: function(req, res) {
		req.session.authenticated = false;
		req.session.user_id = null;
		//TODO: redirect to homepage
	}
};
