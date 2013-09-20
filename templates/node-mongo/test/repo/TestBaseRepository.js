"use strict";

var mongodb = require('mongodb'),
	sinon = require("sinon"),
	BaseRepository,
	assert = require("assert"),
	TestRepository,
	TestEntity,
	MockServer;

MockServer = {
	isConnected: function() {
		return true;
	}
}

sinon.stub(mongodb, 'Server').returns(MockServer);

BaseRepository = require("../../repo/BaseRepository").BaseRepository;

TestRepository = function() {
	BaseRepository.apply(this);
};
TestRepository.prototype = new BaseRepository();
TestRepository.prototype.COLL_NAME = "testCollection";

TestEntity = function() {
};


describe("BaseRepository", function() {

	describe("validation", function() {

		it("should call validate prior to insert", function() {
			var entity = new TestEntity(), repo = new TestRepository();
			repo.insert(entity);
		});

	});

});