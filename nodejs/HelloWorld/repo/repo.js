var oop = require('declare')({"repo": "repo"}),
    mongodb = require('mongodb'),
    server = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT),
    DB_NAME = 'orderManagement-dev'
    conn = new mongodb.Db(DB_NAME, server),
    COLL_NAME = 'customerOrders',

    dojoRequire = require('dojo-node'),
    Deferred = dojoRequire('dojo/_base/Deferred'),
    lang = dojoRequire('dojo/_base/lang'),
    CustomerOrder = require('../model/CustomerOrder').CustomerOrder
    ;


exports.CustomerOrderRepository = oop.declare('repo.CustomerOrder', [], {
    sayHello: function() {
        console.log('Hello!');
        return new Deferred();
    },

    findAll: function() {
        var d = new Deferred();

        conn.open(function(err, db) {
            var docs = [], customerOrder;
            db.collection(COLL_NAME).find().each(function(err, item){
                if (item) {
                    customerOrder = new CustomerOrder();
                    lang.mixin(customerOrder, item); // TODO - encapsulate the mixing in
                    docs.push(customerOrder);
                    customerOrder.logOrderNumber();
                }
                else {
                    // we get a null item when there are no more
                    /*
                     * I think res.send is a once-only operation which commits the response,
                     * so the pattern is to build up the response and res.send it only when finished.
                     */
                    conn.close();
                    console.log('Resolving the deferred');
                    d.resolve(docs);
                }
            });
        });

        return d;
    }

});
