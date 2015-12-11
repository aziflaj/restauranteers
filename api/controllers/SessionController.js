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
				return res.send(user);
			}
		});
	},

	register: function(req, res) {
		return res.send({
			message: 'Register a new user'
		});
	}
};
