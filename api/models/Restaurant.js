/**
* Restaurant.js
*
* @description :: A mapping for restaurant objects in the DB
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },

    address: {
      type: 'string',
      required: true,
    },

    url: {
      type: 'string',
      required: false,
      defaultsTo: '#'
    },

    description: {
      type: 'string',
      required: 'false'
    },

    category: {
      type: 'string',
      enum: ['Cat1', 'Cat2', 'Cat3'],
      defaultsTo: 'Cat1'
    }
  }
};
