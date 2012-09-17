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

  conn.open(function(err, db) {
      var docs = [];
/*
      db.collectionNames(function(err, colls){
          console.log(colls);
      });
*/
      db.collection(COLL_NAME).find().each(function(err, item){
          if (item) {
              console.log(item);
              docs.push(item);
          }
          else {
              // we get a null item when there are no more
              /*
               * I think res.send is a once-only operation which commits the response,
               * so the pattern is to build up the response and res.send it only when finished.
               */
              res.send(docs);
              conn.close();
              console.debug(new CustomerOrderRepository().sayHello());
          }
      });
  });

  //res.send("respond with a resource");
};