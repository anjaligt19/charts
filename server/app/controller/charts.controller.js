const db = require('../config/db.config.js');
const sequelize = db.sequelize;

/**
 * @get 
 * This method is used to get orders per 
 * day for a product for the last two weeks
 */
exports.getCharts = (req, res) => {
	sequelize.query("SELECT o.OrderID, o.OrderDateTime, op.ProductID, COUNT(op.ProductID) AS 'opd' FROM orders o LEFT JOIN order_products op on op.OrderID=o.OrderID WHERE o.OrderDateTime >= DATE_ADD(CURDATE(),INTERVAL -14 DAY) GROUP BY op.ProductID HAVING COUNT(op.ProductID) > 1 ORDER BY opd DESC LIMIT 20").then(function(data){
	  	res.json({status:true,result_code:2000
        ,message:"Record fetched successfully"
        ,data:data[0]});
	});
}


/**
 * @get 
 * This method is used to search 
 * records on the basis of some query
 */
exports.search = (req, res) => {
	var search_keyword = req.query.keyword;
	const search_keyword_with_comma = search_keyword.replace(/ /g, ",");
	var string = req.query.keyword.split(" ");
	sequelize.query("SELECT ProductID, name, Description, Price, Tags, Subtags FROM `products_new` WHERE `Name` LIKE '%" + search_keyword +  "%' or `Tags` LIKE '%"+ search_keyword_with_comma + "%' or Subtags LIKE '%"+ search_keyword_with_comma + "%'").then(function(data){
		if(data[0].length==0)
		{
			sequelize.query("SELECT ProductID, name, Description, Price, Tags, Subtags FROM `products_new` WHERE `Name` LIKE ('%"+string[0]+"%') or `Name` LIKE ('%"+string[1]+"%') or `Name` LIKE ('%"+string[2]+"%') or `Tags` LIKE ('%"+string[0]+"%') or `Tags` LIKE ('%"+string[1]+"%') or `Tags` LIKE ('%"+string[2]+"%') or `Subtags` LIKE ('%"+string[0]+"%') or `Subtags` LIKE ('%"+string[1]+"%') or `Subtags` LIKE ('%"+string[2]+"%')").then(function(indivRes){
				if(indivRes[0].length==0)
				{
					var last_word = string[string.length - 1];
					string[string.length - 1] = last_word.replace(/(?:es|s)/g,'');
					var new_search_keyword = string.join();

					new_search_keyword_n = new_search_keyword.replace(/,/g, " ");
					
					sequelize.query("SELECT ProductID, name, Description, Price, Tags, Subtags FROM `products_new` WHERE `Name` LIKE '%" + new_search_keyword_n +  "%' or `Tags` LIKE '%"+ new_search_keyword + "%' or Subtags LIKE '%"+ new_search_keyword + "%'").then(function(singRes){
						
						if(singRes[0].length==0)
						{
							res.json({status:true,result_code:2000
					        ,message:"No record found"
					        ,data:indivRes[0]});

						}else{
							res.json({status:true,result_code:2000
					        ,message:"Records fetched successfully"
					        ,data:singRes[0]});
						}
					});

				}else{
					res.json({status:true,result_code:2000
			        ,message:"Records fetched successfully"
			        ,data:indivRes[0]});
				}
			})


		}else{
			console.log(data[0].length, '1');
			res.json({status:true,result_code:2000
	        ,message:"Records fetched successfully"
	        ,data:data[0]});
		}
		
	}).catch((err) => {
      res.status(500).send({ error: "Unable to fetch data" });
    });
}

/**
 * @get 
 * This method is used to get sales variations
 */
exports.getSalesVariation = (req, res) => {
	var result = {};
	sequelize.query("SELECT date(OrderDateTime) AS date , COUNT(OrderID) AS num_orders , SUM(OrderAmount) AS daily_total FROM orders WHERE OrderDateTime > (DATE(NOW()) + INTERVAL - 7 DAY) and OrderDateTime < CURDATE() GROUP BY date(OrderDateTime)").then(function(data){
	  		if(data.length>0)
	  		{
	  			result.salesVariation = data[0];
	  			sequelize.query("SELECT SUM(OrderAmount) as totalamt FROM orders WHERE OrderDateTime >= DATE_ADD(CURDATE(),INTERVAL - 7 DAY) and OrderDateTime < CURDATE()", { type: sequelize.QueryTypes.SELECT}).then(function(amtRes){
	  				result.totalPastSales = amtRes[0].totalamt;
	  				sequelize.query("SELECT SUM(OrderAmount) as currsales FROM orders WHERE OrderDateTime >= CURDATE()",{ type: sequelize.QueryTypes.SELECT}).then(function(currentSales){
	  						var diff = currentSales[0].currsales-amtRes[0].totalamt;
	  					
	  						result.salesPercentage = ((diff/amtRes[0].totalamt)*100).toFixed(2);
	  						
	  						res.json({status:true,result_code:2000
					        ,message:"Record fetched successfully"
					        ,data:result});
		  					
		  				});
	  				
	  				
	  			});
	  		}
		  
	}).catch((err) => {
      res.status(500).send({ error: "Unable to fetch data" });
    });
}

/**
 * @get 
 * This method is used to get orders variations
 */
exports.getOrdersVariation = (req, res) => {
	var result = {};
	sequelize.query("SELECT date(OrderDateTime) AS date , COUNT(OrderID) AS num_orders  FROM orders WHERE OrderDateTime > (DATE(NOW()) + INTERVAL - 7 DAY) and OrderDateTime < CURDATE() GROUP BY date(OrderDateTime)").then(function(data){
	  		if(data.length>0)
	  		{
	  			result.orderVariation = data[0];
	  			sequelize.query("SELECT COUNT(OrderID) as totalorders FROM orders WHERE OrderDateTime >= DATE_ADD(CURDATE(),INTERVAL - 7 DAY) and OrderDateTime < CURDATE()", { type: sequelize.QueryTypes.SELECT}).then(function(orderRes){
	  				result.totalPastOrders = orderRes[0].totalorders;
	  				sequelize.query("SELECT COUNT(OrderID) as currorders FROM orders WHERE OrderDateTime >= CURDATE()",{ type: sequelize.QueryTypes.SELECT}).then(function(currentOrders){
	  						var diff = currentOrders[0].currorders-orderRes[0].totalorders;
	  					
	  						result.ordersPercentage = ((diff/orderRes[0].totalorders)*100).toFixed(2);
	  						
	  						res.json({status:true,result_code:2000
					        ,message:"Record fetched successfully"
					        ,data:result});
		  					
		  				});
	  				
	  				
	  			});
	  		}
		  
	}).catch((err) => {
      res.status(500).send({ error: "Unable to fetch data" });
    });
}
