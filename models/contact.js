var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var contactSchema = new Schema({
        user_id: Number,
        contact_id: Number
    });
    contactSchema.plugin(autoIncrement.plugin, 'Contact');
    var Contact = connection.model('Contact', contactSchema);

    return Contact;
}