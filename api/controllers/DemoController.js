/**
 * DemoController
 *
 * @description :: Server-side logic for managing demoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createAdmin: function(req, res) {
		var admin = {
			username: 'admin',
			password: 'admin',
			email: 'admin@example.com',
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
	},

	createCustomer: function(req, res) {
		var customer = {
			username: 'aziflaj',
			password: 'password',
			email: 'aziflaj@example.com',
			first_name: 'Aldo',
			last_name: 'Ziflaj'
		};

		User.create(customer, function(err, user) {
			if (err || !user) {
				return res.send(err);
			} else {
				return res.send({
					status: 'OK',
					message: 'created customer with id ' + user.id,
					user: user
				});
			}
		});
	},

	throw500: function(req, res) {
		return res.serverError();
	}
};
