module.exports = (sequelize, Sequelize) => {
	const Customer = sequelize.define('customer', {
	  OrderID: {
			type: Sequelize.INTEGER
	  },
	  UserID: {
			type: Sequelize.INTEGER
	  },
	  OrderAmount: {
		  type: Sequelize.FLOAT
	  },
	  PaymentStatus: {
		  type: Sequelize.ENUM('Pending', 'Completed', 'Failed')
	  },
	  DeliveryAddress: {
	  	type: Sequelize.STRING
	  },
	  PinCode: {
	  	type: Sequelize.STRING
	  },
	  OrderDateTime: {
	  	type: Sequelize.DATE
	  }

	});
	
	return Customer;
}