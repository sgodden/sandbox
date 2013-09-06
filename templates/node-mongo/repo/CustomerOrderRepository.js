var
    BaseRepository = require("./BaseRepository").BaseRepository,
    CustomerOrder = require("../model/CustomerOrder").CustomerOrder,
    CustomerOrderRepository, proto;

/**
 * @module A repository module for Customer Orders.
 * @type {{CustomerOrderRepository}}
 */
CustomerOrderRepository = function() {
	var foo;

	Object.defineProperty(this, "foo", {
		get: function() {
			return foo;
		},
		set: function(value) {
			foo = value;
		}
	});
	Object.freeze(this);
};


proto = CustomerOrderRepository.prototype = new BaseRepository();
proto.foo = null;
proto.COLL_NAME = "customerOrders";
proto.entityClass = CustomerOrder;

/**
 * An example of overriding a method.
 * @return {number}
 */
proto.count = function() {
	console.log("LOOK AT ME MA - OVERRIDDEN");
    return BaseRepository.prototype.count.apply(this);
};


exports.CustomerOrderRepository = CustomerOrderRepository;



