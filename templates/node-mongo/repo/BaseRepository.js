var
    mongodb = require('mongodb'),
    server = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT, {auto_reconnect: true}),
    DB_NAME = 'orderManagement-dev',
    conn = new mongodb.Db(DB_NAME, server, {safe: true}),
    Q = require('q'),
	djRequire = require("dojo-node"),
	lang = djRequire("dojo/_base/lang"),
    BaseRepository;

conn.open(function(err) {
	if (err) {
		console.error(err);
		console.error("Did you forget to start the server?")
	}
});

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
 * @class
 */
BaseRepository = function() {};

BaseRepository.prototype.execCollection = function (callback) {
	var self = this,
		d = Q.defer();
		conn.collection(self.COLL_NAME, function (err, coll) {
			if (err) {
				throw new Error("Error accessing collection");
			}
			callback(coll, d);
		});
	return d.promise;
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
		var violations = [];
		if (object.validate) {
			violations = object.validate();
		}
		if (violations.length) {
			d.reject(violations);
		} else {
			coll.update(query, clone, function (err) {
				if (err) {
					throw new Error(err);
				} else {
					d.resolve();
				}
			});
		}
	});
};

/**
 * Removes an object from the repository by its id.
 * @param id {string} the id.
 */
BaseRepository.prototype.remove = function(id) {
	var query = {
			_id: new mongodb.ObjectID(id)
		};
	return this.execCollection(function (coll, d) {
		coll.remove(query, function (err) {
			if (err) {
				throw new Error(err);
			} else {
				d.resolve();
			}
		});
	});
}

Object.freeze(BaseRepository);

exports.BaseRepository = BaseRepository;



