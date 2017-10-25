var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var userTagSchema = new Schema({
        user_id: Number,
        tag_id: [Number]
    });
    userTagSchema.plugin(autoIncrement.plugin, 'UserTag');
    var UserTag = connection.model('UserTag', userTagSchema);

    return UserTag;
}