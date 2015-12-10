/**
* User.js
*
* @description :: The user model, mapping users into the DB
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

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

  //TODO: store with password as bcrypt
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
  }
};
