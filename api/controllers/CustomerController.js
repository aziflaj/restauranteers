/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function(req, res) {
		if (req.session.authenticated) {
			return res.redirect('/');
		} else {
			return res.view('register');
		}
	},

	create: function(req, res) {
		if (req.body.password !== req.body.password_repeat) {
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
				return res.redirect('/register'); // TODO: add flash
			} else {
				return res.send(success);
			}
		});
	},

	settings: function(req, res) {
		User.findOne({id: req.session.user_id}, function(err, user) {
			return res.view('customer/settings', user);
		});
	},

	developer: function(req, res) {
		User.findOne({id: req.session.user_id}, function(err, user) {
			if (err) {
				console.log(err);
			} else {
				User.generateApiKey(user, function(err, user) {
					if (err) {
						console.log(err);
					} else {
						return res.redirect('customer/settings');
					}
				});
			}
		});
	},

	updatePassword: function(req, res) {
		if (req.body.password === req.body.repeat_password) {
			User.findOne({id: req.session.user_id}, function(err, user) {
				User.resetPassword(user, req.body.password, function(err, user) {
					if (err) {
						return res.send(err);
					} else {
						return res.redirect('customer/settings');
					}
				});
			});
		} else {
			return res.redirect('customer/settings');
		}
	},

	updateContact: function(req, res) {
		User.findOne({id: req.session.user_id}, function(err, user) {
			if (err) {
				console.log(err);
			} else {
				user.first_name = req.body.first_name;
				user.last_name = req.body.last_name;
				user.email = req.body.email;

				user.save(function(err, saved) {
					if (err) {
						console.log(err);
					} else {
						return res.redirect('customer/settings');
					}
				});
			}
		});
	}
};
