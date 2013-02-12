var
    BaseRepository = require("./BaseRepository").BaseRepository,
    CustomerOrder = require("../model/CustomerOrder").CustomerOrder,
    CustomerOrderRepository;

/**
 * @module A repository module for Customer Orders.
 * @type {{CustomerOrderRepository}}
 */
CustomerOrderRepository = function() {
};

CustomerOrderRepository.prototype = new BaseRepository();
CustomerOrderRepository.prototype.COLL_NAME = "customerOrders";
CustomerOrderRepository.prototype.entityClass = CustomerOrder;

/**
 * An example of overriding a method.
 * @return {number}
 */
CustomerOrderRepository.prototype.count = function() {
    console.log("Count in CustomerOrderRepository");
    return BaseRepository.prototype.count.apply(this);
};


exports.CustomerOrderRepository = CustomerOrderRepository;


