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

exports.CustomerOrderRepository = CustomerOrderRepository;



