"use strict";

var ObjectValidator = function() {};

ObjectValidator.prototype.validate = function (object) {
	var violations = [];

	object.constraints && object.constraints.forEach(function (constraint) {
		var property = constraint.property;
		if (constraint.required) {
			if (!object.hasOwnProperty(property) || object[property] === null) {
				violations.push({
					path: property,
					type: 'required'
				});
			}
		}
	});

	return violations;
}

exports.ObjectValidator = ObjectValidator;