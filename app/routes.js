var path = require('path');

module.exports = function (app, models) {
    var main = require('./main.js')(models);

    app.get('/main/get_home', main.get_home);

    app.post('/main/signin_facebook', main.signin_facebook);
    app.post('/main/signup_phone', main.signup_phone);
    app.post('/main/create_user', main.create_user);
    app.post('/main/change_user', main.change_user);
    app.post('/main/change_photo', main.change_photo);
    app.get('/main/get_me', main.get_me);
    app.post('/main/change_user_tag', main.change_user_tag);
    app.get('/main/get_users', main.get_users);

    app.post('/main/add_tag', main.add_tag);
    app.post('/main/change_tag', main.change_tag);
    app.get('/main/get_tags', main.get_tags);

    app.get('/main/get_feed', main.get_feed);
    app.post('/main/post_feed', main.post_feed);
    app.post('/main/like_feed', main.like_feed);
    app.post('/main/comment_feed', main.comment_feed);

    app.post('/main/add_meet', main.add_meet);
    app.get('/main/get_meets', main.get_meets);
    app.post('/main/add_video', main.add_video);
    app.get('/main/get_videos', main.get_videos);
    app.post('/main/add_contact', main.add_contact);
    app.get('/main/get_contacts', main.get_contacts);
    app.post('/main/add_event', main.add_event);
    app.post('/main/add_event_contact', main.add_event_contact);
    app.get('/main/get_events', main.get_events);
    app.get('/main/get_chat_room', main.get_chat_room);

    app.post('/main/send_not', main.send_not);
    app.get('/main/get_notifications', main.get_notifications);
}