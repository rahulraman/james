module.exports = function (connection) {
    var user = require('./user')(connection);
    var admin = require('./admin')(connection);
    var chat_room = require('./chat_room')(connection);
    var chat = require('./chat')(connection);
    var contact = require('./contact')(connection);
    var event = require('./event')(connection);
    var feed = require('./feed')(connection);
    var home = require('./home')(connection);
    var meet = require('./meet')(connection);
    var tag = require('./tag')(connection);
    var user_tag = require('./user_tag')(connection);
    var video = require('./video')(connection);
    var notification = require('./notification')(connection);

    return {
        user: user,
        admin: admin,
        chat_room: chat_room,
        chat: chat,
        contact: contact,
        event: event,
        feed: feed,
        home: home,
        meet: meet,
        tag: tag,
        user_tag: user_tag,
        video: video,
        notification: notification
    }
}