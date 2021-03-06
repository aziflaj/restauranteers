/**
* User.js
*
* @description :: The user model, mapping users into the DB
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');
var uuid = require('uuid');
var hat = require('hat');

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },

    username: {
      type: 'string',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true,
    },

    user_type: {
      type: 'string',
      required: true,
      enum: ['admin', 'manager', 'customer'],
      defaultsTo: 'customer'
    },

    first_name: {
      type: 'string',
      required: true
    },

    last_name: {
      type: 'string',
      required: true
    },

    api_key: {
      type: 'string',
      required: false
    }
  },

  beforeCreate: function(user, next) {
    console.log('Saving user');
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(error, hash) {
        if (error) {
          console.log(error);
          next(error);
        } else {
          user.password = hash;
          next(null, user);
        }
      });
    });
  },

  attemptLogin: function(user, next) {
    User.findOne({username: user.username}, function(error, foundUser) {
      if (error) {
        console.log(error);
        next(error);
      } else if (foundUser === undefined) {
        next({
          error: 'E_AUTHENTICATION',
          status: 403, //forbidden
          summary: 'Wrong username or password'
        });
      } else {
        bcrypt.compare(user.password, foundUser.password, function(error, res) {
          if (error) {
            console.log(error);
            next(error);
          } else {
            next(null, foundUser);
          }
        });
      }
    });
  },

  isAdmin: function(user, next) {
    if (user.user_type === 'admin') {
      console.log('admin');
      next(null, user);
    } else {
      next({
        error: 'E_AUTHORIZATION',
        status: 403, //forbidden
        summary: 'You don\'t have access here'
      });
    }
  },

  isManager: function(user, next) {
    if (user.user_type === 'manager') {
      console.log('manager');
      next(null, user);
    } else {
      next({
        error: 'E_AUTHORIZATION',
        status: 403, //forbidden
        summary: 'You don\'t have access here'
      });
    }
  },

  isCustomer: function(user, next) {
    if (user.user_type === 'customer') {
      next(null, user);
    } else {
      next({
        error: 'E_AUTHORIZATION',
        status: 403, //forbidden
        summary: 'You don\'t have access here'
      });
    }
  },

  isDeveloper: function(user, next) {
    if (user.user_type === 'customer' && user.api_key) {
      console.log('developer');
      next(null, user);
    } else {
      next({
        error: 'E_AUTHORIZATION',
        status: 403, //forbidden
        summary: 'You don\'t have access here'
      });
    }
  },

  generateApiKey: function(user, next) {
    var api_key = hat();
    console.log('API key generated: ' + api_key);
    user.api_key = api_key;
    user.save(function(error, saved) {
      if (error) {
        console.log(error);
        next(error);
      } else {
        console.log('user saved');
        next(null, user);
      }
    });
  },

  resetPassword: function(user, password, next) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(error, hash) {
        if (error) {
          console.log(error);
          next(error);
        } else {
          user.password = hash;
          user.save(function(error, saved) {
            if (error) {
              console.log(error);
              next(error);
            } else {
              next(null, user);
            }
          });
        }
      });
    });
  }
};
