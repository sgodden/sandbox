"use strict";

var CustomerOrderCancelCommand,
	CustomerOrderStatus = require("./CustomerOrderStatus");

CustomerOrderCancelCommand = function() {
	Object.seal(this);
}

CustomerOrderCancelCommand.prototype.execute = function(order) {
	order.status = CustomerOrderStatus.CANCELLED;
}

module.exports = CustomerOrderCancelCommand;

