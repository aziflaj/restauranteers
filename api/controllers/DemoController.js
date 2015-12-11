/**
 * DemoController
 *
 * @description :: Server-side logic for managing demoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createAdmin: function(req, res) {
		var tryNumber = 0;
		var admin = {
			username: 'admin' + tryNumber,
			password: 'admin' + tryNumber,
			email: 'admin' + tryNumber + '@example.com',
			user_type: 'admin',
			first_name: 'Admini',
			last_name: 'Strator'
		};

		User.create(admin, function(err, user) {
			if (err || !user) {
				return res.send(err);
			} else {
				return res.send({
					status: 'OK',
					message: 'created admin with id ' + user.id,
					user: user
				});
			}
		});
	}
};
