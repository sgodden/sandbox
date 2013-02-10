var
    mongodb = require('mongodb'),
    server = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT),
    DB_NAME = 'orderManagement-dev',
    conn = new mongodb.Db(DB_NAME, server, {safe: true}),
    COLL_NAME = 'customerOrders',

    dojoRequire = require('dojo-node'),
    Deferred = dojoRequire('dojo/_base/Deferred'),

    lang = dojoRequire('dojo/_base/lang'),
    CustomerOrder = require('../model/CustomerOrder').CustomerOrder,
    CustomerOrderRepository;

/**
 * @module A repository module for Customer Orders.
 * @type {{CustomerOrderRepository}}
 */
CustomerOrderRepository = {
};

CustomerOrderRepository.execDb = function(callback) {
    var d = new Deferred();

    conn.open(function(err, db) {
        var d2 = new Deferred();
        callback(db, d2);
        d2.then(function(results){
            conn.close();
            d.resolve(results);
        });
    });

    return d;
}

/**
 * @method
 * @return {Deferred}
 */
CustomerOrderRepository.findAll = function () {
    return CustomerOrderRepository.execDb(function(db, d){
        var docs = [], customerOrder;
        db.collection(COLL_NAME, function (err, coll) {
            coll.find().each(function (err, item) {
                if (item) {
                    customerOrder = new CustomerOrder();
                    customerOrder.orderNumber = item.orderNumber;
                    docs.push(customerOrder);
                    customerOrder.logOrderNumber();
                }
                else {
                    // we get a null item when there are no more
                    d.resolve(docs);
                }
            });
        });
    });
};

CustomerOrderRepository.count = function () {
    return CustomerOrderRepository.execDb(function(db, d){
        db.collection(COLL_NAME, function (err, coll) {
            coll.count(function (err, count) {
                if (err) {
                    console.log('An error occurred on count');
                    console.log(err);
                    throw new Error(JSON.stringify(err));
                }
                console.log('count ' + count);
                d.resolve(count);
            });
        });
    });
};

CustomerOrderRepository.insert = function (order) {
    return CustomerOrderRepository.execDb(function(db, d){
        db.collection(COLL_NAME, function (err, coll) {
            coll.insert(order, {safe: true}, function (err, doc) {
                if (err) {
                    throw new Error(err);
                }
                else {
                    d.resolve(doc);
                }
            });
        });
    });
};

exports.CustomerOrderRepository = CustomerOrderRepository;



