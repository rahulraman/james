var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var chatRoomSchema = new Schema({
        isGroup: Boolean,
        local: String,
        tags: String,
        creator: Number,
        users: [Number],
        created_date: Date
    });
    chatRoomSchema.plugin(autoIncrement.plugin, 'ChatRoom');
    var ChatRoom = connection.model('ChatRoom', chatRoomSchema);

    return ChatRoom;
}