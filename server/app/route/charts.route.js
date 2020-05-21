/**
 * This is routes file for dynamic charts
 * it contains routes for get charts 
 * @param req it contains request parameters
 * @param res it contains result 
 * @param next Callback argument to the middleware function
 */
module.exports = function(app) {
 
  const charts = require('../controller/charts.controller.js');
  
  /**
  * @Definition : This routes used to get orders
  *  per day for a product for the last two weeks
  */
  app.get('/api/charts', charts.getCharts);

  /**
  * @Definition : This routes used to get
  *  variation in the sales amount per day
  */
  app.get('/api/getSalesVariation', charts.getSalesVariation);

  /**
  * @Definition : This routes used to get
  *  variation in the number of orders per day
  */
  app.get('/api/getOrdersVariation', charts.getOrdersVariation);

  /**
  * @Definition : This routes used to get
  *  search query result
  */
  app.get('/api/search', charts.search);
 
    
}