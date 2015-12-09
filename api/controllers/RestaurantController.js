/**
 * RestaurantController
 *
 * @description :: Server-side logic for managing restaurants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
   * List all the records
	 * @method GET
   * @route /
   */
  find: function (req, res) {
		return res.send({
			message: 'Show all restaurants'
		});
  },

  /**
   * Information about a single ship
   * @method GET
   * @route /:id
   */
  findOne: function (req, res) {
		return res.send({
			message: 'Show restaurant with id ' + req.params.id
		});
  },

  /**
   * Craete a new ship instance
	 * @method POST
   * @route /
   */
  create: function (req, res) {
  },

  /**
   * Update an existing Ship
	 * @method PUT
   * @route /:id
   */
  update: function (req, res) {
		return res.send({
			message: 'Update restaurant with id ' + req.params.id
		});
  },


  /**
   * Delete an existing ship
	 * @method DELETE
   * @route /:id
   */
  destroy: function (req, res) {
		return res.send({
			message: 'Delete restaurant with id ' + req.params.id
		});
  }
};
