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
	}
};
