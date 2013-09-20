"use strict";

var mongodb = require('mongodb'),
	sinon = require("sinon"),
	BaseRepository,
	assert = require("assert"),
	TestRepository,
	TestEntity,
	MockServer,
	Db,
	Collection;

// bunch of mocks
MockServer = {
	isConnected: function() {
		return true;
	}
};

Collection = {
	insert: function(docs, options, callback) {
		console.log("INSERT");
		callback(null, docs);
	}
};

Db = {
	collection: function(name, callback) {
		callback(null, Collection);
	},
	open: function() {}
};

sinon.stub(mongodb, 'Server').returns(MockServer);
sinon.stub(mongodb, 'Db').returns(Db);

BaseRepository = require("../../repo/BaseRepository").BaseRepository;

TestRepository = function() {
	BaseRepository.apply(this);
};
TestRepository.prototype = new BaseRepository();
TestRepository.prototype.COLL_NAME = "testCollection";

TestEntity = function() {};
TestEntity.prototype.validate = function() {
	return [];
};


describe("BaseRepository", function() {

	describe("validation", function() {

		it("should call validate prior to insert", function() {
			var entity = new TestEntity(),
				repo = new TestRepository(),
				spy = sinon.spy(TestEntity.prototype, "validate");

			repo.insert([entity]);
			assert(spy.called);
		});

		it("should insert in to the collection if validation succeeds", function(done) {
			var entity = new TestEntity(),
				repo = new TestRepository(),
				spy = sinon.spy(Collection, "insert");

			repo.insert([entity]).then(function() {
				assert(spy.called);
			});
		});

	});

});