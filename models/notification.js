var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var notificationSchema = new Schema({
        target: Number,
        content: String,
        created_date: Date
    });
    notificationSchema.plugin(autoIncrement.plugin, 'Notification');
    var Notification = connection.model('Notification', notificationSchema);

    return Notification;
}