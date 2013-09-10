"use strict";

var ObjectValidator = require("../../../model/validation/ObjectValidator").ObjectValidator,
	assert = require("assert");

describe("ObjectValidator", function() {

	describe("validate", function() {

		it("should handle 'required' constraints", function() {
			var object = {
					constraints: [
						{
							property: 'foo',
							required: true
						}
					]
				},
				violations = new ObjectValidator().validate(object);
			assert.equal(1, violations.length);
		});

		it("should return an empty array if no violations", function() {
			var object = {},
				violations = new ObjectValidator().validate(object);
			assert.equal(0, violations.length);
		});

	});

});