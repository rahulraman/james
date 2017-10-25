var mongoose = require('mongoose');
var moment = require('moment');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var adminSchema = new Schema({
        email: String,
        password: String,
        name: String,
        phone: String,
        role_set: String,
        created_date: Date,
        updated_date: Date
    });
    adminSchema.plugin(autoIncrement.plugin, 'Admin');
    var Admin = connection.model('Admin', adminSchema);

    return Admin;
}