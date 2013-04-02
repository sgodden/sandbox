"use strict";

var User;

/**
 * @module User
 */
User = function(args) {
    /*
     * Private properties.
     */
	var id = null,
		username = null,
    	fullname = null,
		password = null,
		roles = [];

	/**
	 * @field
	 * @type {string}
	 */
    Object.defineProperty(this, 'id', {
        enumerable: true,
        get: function() {
            return id;
        },
		set: function(value) {
			id = value;
		}
    });

    Object.defineProperty(this, 'username', {
        enumerable: true,
        get: function() {
            return username;
        },
        set: function(value) {
            username = value;
        }
    });

    Object.defineProperty(this, 'fullname', {
        enumerable: true,
        get: function() {
            return fullname;
        },
        set: function(value) {
            fullname = value;
        }
    });

    Object.defineProperty(this, 'roles', {
        enumerable: true,
        get: function() {
            return roles;
        },
        set: function(value) {
            roles = value;
        }
    });

    Object.defineProperty(this, 'password', {
        enumerable: true,
        get: function() {
            return password;
        },
        set: function(value) {
            password = value;
        }
    });

    Object.seal(this);

	if (args) {
		for (var key in args) {
			if (args.hasOwnProperty(key)) {
				this[key] = args[key];
			}
		}
	}
};

/**
 * @function
 * @param {Object} item the item loaded from the persistent store.
 * @description hydrates an instance of CustomerOrder from persistent data.
 */
User.prototype.hydrate = function(item) {
    var self = this;
	this.username = item._id;
    [
		'username',
		'fullname',
		'roles'
	].forEach(function(propertyName) {
        self[propertyName] = item[propertyName];
    });

	this.id = item._id;
};

exports.User = User;