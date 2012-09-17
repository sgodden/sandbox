var mongodb = require('mongodb'),
    server = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT),
    DB_NAME = 'orderManagement-dev'
    conn = new mongodb.Db(DB_NAME, server),
    COLL_NAME = 'customerOrders',
    repo = require('../repo/repo'),
    CustomerOrderRepository = repo.CustomerOrderRepository;


/*
 * GET users listing.
 */

exports.list = function(req, res){

    new CustomerOrderRepository().findAll().then(function(docs){
        res.send(docs);
    });

};