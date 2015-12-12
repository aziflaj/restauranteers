/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		if (req.session.authenticated) {
			User.findOne({id: req.session.user_id}, function(err, user) {
				if (err) {
					console.log(error);
					return res.send(error);
				} else {
					return res.send(user);
				}
			});
		} else {
			return res.send({
				message: 'login first'
			});
		}
	}
};
