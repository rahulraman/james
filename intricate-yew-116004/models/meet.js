var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var meetSchema = new Schema({
        user_id: Number,
        name: String,
        during: Number
    });
    meetSchema.plugin(autoIncrement.plugin, 'Meet');
    var Meet = connection.model('Meet', meetSchema);

    return Meet;
}