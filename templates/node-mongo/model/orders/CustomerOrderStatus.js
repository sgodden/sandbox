"use strict";

var CustomerOrderStatus = {
	NEW: "NEW",
	CONFIRMED: "CONFIRMED",
	CANCELLED: "CANCELLED",
	SHIPPED: "SHIPPED"
};

Object.seal(CustomerOrderStatus);

module.exports = CustomerOrderStatus;

