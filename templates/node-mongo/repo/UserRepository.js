var
    BaseRepository = require("./BaseRepository").BaseRepository,
    User = require("../model/User").User,
    UserRepository;

/**
 * @module A repository module for Users.
 */
UserRepository = function() {
};

UserRepository.prototype = new BaseRepository();
UserRepository.prototype.COLL_NAME = "users";
UserRepository.prototype.entityClass = User;

module.exports = UserRepository;



