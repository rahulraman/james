var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var chatSchema = new Schema({
        content: String,
        from: Number,
        isReady: {
            user_id: Number,
            is: Boolean
        },
        type: String,
        created_date: Date
    });
    chatSchema.plugin(autoIncrement.plugin, 'Chat');
    var Chat = connection.model('Chat', chatSchema);

    return Chat;
}