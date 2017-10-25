var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var videoSchema = new Schema({
        url: String,
        user_id: Number,
        during: Number,
        title: String,
        tags: String,
        size: String
    });
    videoSchema.plugin(autoIncrement.plugin, 'Video');
    var Video = connection.model('Video', videoSchema);

    return Video;
}