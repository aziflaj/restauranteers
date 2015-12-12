/**
 * SessionController
 *
 * @description :: Manage sessions, authentication and registration of new users
 */

var bcrypt = require('bcrypt');

module.exports = {
	login: function(req, res) {
		var user = {
			username: req.body.username,
			password: req.body.password
		};

		User.attemptLogin(user, function(error, user) {
			if (error) {
				console.log(error);
				return res.send(error);
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

	register: function(req, res) {
		if (req.body.password !== req.body.password_repeat) {
			console.log('pwd: ' + req.body.password);
			console.log('rpt_pwd: ' + req.body.password_repeat);
			return res.send('Passwords don\'t match'); //TODO: add some flash
		}

		var newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		};

		User.create(newUser, function(err, success) {
			if (err) {
				console.log(err);
				return res.send(err);
			} else {
				return res.send(success);
			}
		});
	},

	logout: function(req, res) {
		req.session.authenticated = false;
		req.session.user_id = null;
		//TODO: redirect to homepage
	}
};
