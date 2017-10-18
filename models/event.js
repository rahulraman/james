var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var eventSchema = new Schema({
        user_id: Number,
        type: String,
        title: String,
        date: String,
        content: String,
        contacts: [Number],
        local: String,
        created_date: Date
    });
    eventSchema.plugin(autoIncrement.plugin, 'Event');
    var Event = connection.model('Event', eventSchema);

    return Event;
}