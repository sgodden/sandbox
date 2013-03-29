"use strict";

var CustomerOrderConfirmCommand,
	CustomerOrderStatus = require("./CustomerOrderStatus");

CustomerOrderConfirmCommand = function() {
	Object.seal(this);
}

CustomerOrderConfirmCommand.prototype.execute = function(order) {
	order.status = CustomerOrderStatus.CONFIRMED;
}

module.exports = CustomerOrderConfirmCommand;

