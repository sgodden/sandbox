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
	BaseRepository.apply(this);
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

Object.freeze(CustomerOrderRepository.prototype);

exports.CustomerOrderRepository = CustomerOrderRepository;



