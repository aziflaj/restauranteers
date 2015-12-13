/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 */

module.exports.routes = {

  // the home page
  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Login/Logout and register routes.                                        *
  * These routes send a view for GET requests and map to the specified       *
  * SessionController functions for POST requests                            *
  *                                                                          *
  ***************************************************************************/

  'GET /login': { view: 'login' },
  'POST /login': 'SessionController.login',
  'GET /register': { view: 'register' },
  'POST /register': 'SessionController.register',
  '/logout': 'SessionController.logout',


  /***************************************************************************
  *                                                                          *
  * Administator-specific routes.                                            *
  * These routes serve views and functionality to the admin users. Every     *
  * admin has the access of creating restaurants and asigning a manager      *
  * to each of them. They can  delete restaurants or managers and also       *
  * customers from the system.                                               *
  *                                                                          *
  ***************************************************************************/

  '/admin/dashboard': {
    view: 'admin/dashboard'
  },

  // routes used for testing
  'GET /demo/admin': 'DemoController.createAdmin',
  'GET /demo/customer': 'DemoController.createCustomer',
  'GET /me': 'UserController.index',
  'GET /500': 'DemoController.throw500',
};
