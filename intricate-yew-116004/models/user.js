var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function (connection) {
    var Schema = mongoose.Schema;
    autoIncrement.initialize(connection);

    var userSchema = new Schema({
        username: String,
        password: String,
        first_name: String,
        last_name: String,
        phone: String,
        email: String,
        age: Number,
        city: String,
        gender: String,
        pronouns: String,
        sexuality: String,
        bio: String,
        login_type: String,
        position: [Number],
        receiver_token: String,
        created_date: Date,
        updated_date: Date
    });
    userSchema.plugin(autoIncrement.plugin, 'User');
    var User = connection.model('User', userSchema);

    return User;
}