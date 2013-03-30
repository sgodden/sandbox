var
    mongodb = require('mongodb'),
    server = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT),
    DB_NAME = 'orderManagement-dev',
    conn = new mongodb.Db(DB_NAME, server, {safe: true}),
    Q = require('q'),
	djRequire = require("dojo-node"),
	lang = djRequire("dojo/_base/lang"),
    BaseRepository;

function fixId(query) {
	var ret = lang.clone(query);
	if (query.id && !(query.id instanceof mongodb.ObjectID)) {
		delete ret.id;
		ret._id = new mongodb.ObjectID(query.id);
	}
	return ret;
}

/**
 * A base repository providing common repository methods.
 * @constructor
 */
BaseRepository = function() {
};

/**
 * Returns a deferred, executes the passed callback within an open connection, and resolves the returned deferred
 * with the results of the callback after having closed the connection.
 * @param callback the callback to execute with the open connection.
 * @return {Object} the deferred which will be resolved with the results of the callback.
 */
BaseRepository.prototype.execDb = function (callback) {
    var ret = Q.defer();

    conn.open(function (err, db) {
        if (err) {
            console.error(err);
            console.error("Did you forget to start the server?")
        }
        var d = Q.defer();
        callback(db, d);
        d.promise.then(function (results) {
            conn.close();
            ret.resolve(results);
        });
    });

    return ret.promise;
};

BaseRepository.prototype.execCollection = function (callback) {
	var self = this;
	return this.execDb(function (db, d) {
		db.collection(self.COLL_NAME, function (err, coll) {
			if (err) {
				throw new Error("Error accessing collection");
			}
			callback(coll, d);
		});
	});
}

BaseRepository.prototype.entityClass = null;

BaseRepository.prototype.count = function () {
    return this.execCollection(function (coll, d) {
		coll.count(function (err, count) {
			if (err) {
				console.log('An error occurred on count');
				console.log(err);
				throw new Error(JSON.stringify(err));
			}
			d.resolve(count);
		});
    });
};

BaseRepository.prototype.findAll = function() {
    var self = this;
    return this.execCollection(function (coll, d) {
        var entities = [], entity;
		coll.find().each(function (err, item) {
			if (item) {
				entity = new self.entityClass();
				entity.hydrate(item);
				entities.push(entity);
			}
			else {
				// we get a null item when there are no more
				d.resolve(entities);
			}
		});
    });
};

/**
 * @param {Array|Object} docs
 * @return {Object} a promise.
 */
BaseRepository.prototype.insert = function (docs) {
    return this.execCollection(function (coll, d) {
		coll.insert(docs, {safe: true}, function (err, docs) {
			if (err) {
				throw new Error(err);
			}
			else {
				d.resolve(docs);
			}
		});
    });
};

BaseRepository.prototype.findOne = function(query) {
	var self = this;
	query = fixId(query);
	return this.execCollection(function (coll, d) {
		coll.findOne(query, function (err, doc) {
			var entity;
			if (err) {
				throw new Error(err);
			}
			else {
				if (doc) {
					entity = new self.entityClass();
					entity.hydrate(doc);
				}
				d.resolve(entity);
			}
		});
	});
};

BaseRepository.prototype.update = function(query, doc) {
	return this.execCollection(function (coll, d) {
		coll.update(query, doc, function (err) {
			if (err) {
				throw new Error(err);
			} else {
				d.resolve();
			}
		});
	});
};

BaseRepository.prototype.updateById = function(object) {
	var query = {
			_id: new mongodb.ObjectID(object.id)
		},
		clone = lang.clone(object);
	// we don't want to store the id twice for no purpose
	delete clone.id;
	return this.execCollection(function (coll, d) {
		coll.update(query, clone, function (err) {
			if (err) {
				throw new Error(err);
			} else {
				d.resolve();
			}
		});
	});
};

exports.BaseRepository = BaseRepository;



