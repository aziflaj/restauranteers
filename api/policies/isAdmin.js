/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow only authenticated Administrators
 *                 perform a given action
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    var id = req.session.user_id;
    User.findOne({id: id}, function(error, user) {
      if (error) {
        console.log(error);
        return res.forbidden('You are not permitted to perform this action.');
      } else {
        User.isAdmin(user, function(error, user) {
          if (error) {
            console.log(error);
            return res.forbidden('You are not permitted to perform this action.');
          } else {
            return next();
          }
        });
      }
    });
  }

  // User is not loged in at all
  return res.forbidden('You are not permitted to perform this action.');
};
