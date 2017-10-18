var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var tagSchema = new Schema({
        name: String
    });
    tagSchema.plugin(autoIncrement.plugin, 'Tag');
    var Tag = connection.model('Tag', tagSchema);

    return Tag;
}