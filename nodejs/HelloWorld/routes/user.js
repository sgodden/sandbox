var mongodb = require('mongodb'),
    server = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT),
    conn = new mongodb.Db('orderManagement-dev', server);


/*
 * GET users listing.
 */

exports.list = function(req, res){

  conn.open(function(err, db) {
      console.log('Opened it!');
      db.collectionNames(function(err, colls){
          console.log(colls);
      });
      db.collection('customerOrders').find().each(function(err, item){
          console.log(item);
      });
  });

  res.send("respond with a resource");
};