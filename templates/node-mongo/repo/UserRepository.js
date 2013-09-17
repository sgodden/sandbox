var
    BaseRepository = require("./BaseRepository").BaseRepository,
    User = require("../model/User").User,
    UserRepository;

/**
 * @module A repository module for Users.
 */
UserRepository = function() {
	BaseRepository.apply(this);
	Object.freeze(this);
};

UserRepository.prototype = new BaseRepository();
UserRepository.prototype.COLL_NAME = "users";
UserRepository.prototype.entityClass = User;

Object.freeze(UserRepository.prototype);

module.exports = UserRepository;



