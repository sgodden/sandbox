"use strict";

var CustomerOrderNewState,
	CustomerOrderCancelCommand = require("./CustomerOrderCancelCommand"),
	CustomerOrderConfirmCommand = require("./CustomerOrderConfirmCommand");

CustomerOrderNewState = function() {
	Object.seal(this);
};

CustomerOrderNewState.prototype.confirm = function(order) {
	new CustomerOrderConfirmCommand().execute(order);
};

CustomerOrderNewState.prototype.cancel = function(order) {
	new CustomerOrderCancelCommand().execute(order);
};

module.exports = CustomerOrderNewState;