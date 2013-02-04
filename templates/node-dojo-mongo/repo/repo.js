var oop = require('declare')({"repo": "repo"}),
    mongodb = require('mongodb'),
    server = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT),
    DB_NAME = 'orderManagement-dev'
    conn = new mongodb.Db(DB_NAME, server, {safe: true}),
    COLL_NAME = 'customerOrders',

    dojoRequire = require('dojo-node'),
    Deferred = dojoRequire('dojo/_base/Deferred'),

    lang = dojoRequire('dojo/_base/lang'),
    CustomerOrder = require('../model/CustomerOrder').CustomerOrder,
    CustomerOrderRepository = null;

CustomerOrderRepository = oop.declare('repo.CustomerOrderRepository', [], {

    findAll: function() {
        var d = new Deferred();

        var docs = [], customerOrder;

        conn.open(function(err, db){
            db.collection('customerOrders', function(err, coll){
                coll.find().each(function(err, item){
                    if (item) {
                        customerOrder = new CustomerOrder();
                        lang.mixin(customerOrder, item); // TODO - encapsulate the mixing in
                        docs.push(customerOrder);
                        customerOrder.logOrderNumber();
                    }
                    else {
                        // we get a null item when there are no more
                        /*
                         * res.send is a once-only operation which commits the response,
                         * so the pattern is to build up the response and res.send it only when finished.
                         */
                        conn.close();
                        d.resolve(docs);
                    }
                });
            });
        });

        return d;
    },

    count: function() {
        var d = new Deferred();

        conn.open(function(err, db){
            db.collection('customerOrders', function(err, coll){
                coll.count(function(err, count){
                    if (err) {
                        console.log('An error occurred on count');
                        console.log(err);
                        throw new Error(JSON.stringify(err));
                    }
                    console.log('count ' + count);
                    conn.close();
                    d.resolve(count);
                });
            });
        });

        return d;
    },

    insert: function(order) {
        var d = new Deferred();
        conn.open(function(err, db){
            db.collection('customerOrders', function(err, coll){
                db.collection('customerOrders').insert(order, {safe: true}, function(err, doc){
                    if (err) {
                        throw new Error(err);
                    }
                    else {
                        conn.close();
                        d.resolve(doc);
                    }
                });
            });
        });
        return d;
    }

});

exports.CustomerOrderRepository = CustomerOrderRepository;



