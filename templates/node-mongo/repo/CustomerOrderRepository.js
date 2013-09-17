var
    BaseRepository = require("./BaseRepository").BaseRepository,
    CustomerOrder = require("../model/CustomerOrder").CustomerOrder,
    CustomerOrderRepository, proto;

/**
 * A repository for customer orders.
 * @constructor
 * @extends BaseRepository
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

CustomerOrderRepository.prototype = new BaseRepository();

/**
 * @const
 * @type {string}
 */
CustomerOrderRepository.prototype.COLL_NAME = "customerOrders";
/**
 * @const
 * @type {*}
 */
CustomerOrderRepository.prototype.entityClass = CustomerOrder;

/**
 * Returns a count of customer orders.
 * @returns {number}
 */
CustomerOrderRepository.prototype.count = function() {
    return BaseRepository.prototype.count.apply(this);
};


exports.CustomerOrderRepository = CustomerOrderRepository;



