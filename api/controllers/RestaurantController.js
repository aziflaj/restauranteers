/**
 * RestaurantController
 *
 * @description :: Server-side logic for CRUDing restaurants
 * @route       :: /restaurant
 */

module.exports = {

  _config: {
    rest: true
  },

	/**
   * List all the restaurants in the DB
	 * @method GET
   * @route /
   */
  find: function (req, res) {
    return res.send({
      message: 'Show all restaurants'
    });
  },

  /**
   * Information about a single restaurant, filtered by the ID
   * @method GET
   * @route /:id
   */
  findOne: function (req, res) {
		return res.send({
			message: 'Show restaurant with id ' + req.params.id
		});
  },

  /**
   * Create a new restaurant
	 * @method POST
   * @route /
   */
  create: function (req, res) {
    //create
    return res.send({
      message: 'Creating restaurant'
    });
  },

  /**
   * Update an existing restaurant, based on the ID
	 * @method PUT
   * @route /:id
   */
  update: function (req, res) {
		return res.send({
			message: 'Update restaurant with id ' + req.params.id
		});
  },


  /**
   * Delete the restaurant with the given ID
	 * @method DELETE
   * @route /:id
   */
  destroy: function (req, res) {
		return res.send({
			message: 'Delete restaurant with id ' + req.params.id
		});
  }
};
