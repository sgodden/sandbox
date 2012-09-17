var oop = require('declare')({"repo": "repo"}),
    mongodb = require('mongodb'),
    server = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT),
    DB_NAME = 'orderManagement-dev'
    conn = new mongodb.Db(DB_NAME, server),
    COLL_NAME = 'customerOrders',

    dojoRequire = require('dojo-node'),
    Deferred = dojoRequire('dojo/_base/Deferred');


exports.CustomerOrderRepository = oop.declare('repo.CustomerOrder', [], {
    sayHello: function() {
        console.log('Hello!');
        return new Deferred();
    },

    findAll: function() {

    }

});
