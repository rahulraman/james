var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var feedSchema = new Schema({
        user_id: Number,
        content: String,
        attached: {
            type: String,
            url: String
        },
        likes: [Number],
        comments: [{
            id: Number,
            content: String,
            created_date: Date
        }],
        created_date: Date
    });
    feedSchema.plugin(autoIncrement.plugin, 'Feed');
    var Feed = connection.model('Feed', feedSchema);

    return Feed;
}