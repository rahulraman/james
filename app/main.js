var fs = require("fs");
var fss = require('fs-extra');
var cfg = require('../config');
var moment = require('moment');

module.exports = function (models) {
    var User = models.user;
    var Admin = models.admin;
    var Tag = models.tag;
    var UserTag = models.user_tag;
    var Home = models.home;
    var Contact = models.contact;
    var Feed = models.feed;
    var Meet = models.meet;
    var Video = models.video;
    var Event = models.event;
    var ChatRoom = models.chat_room;
    var Notification = models.notification;
    var dataPro = require('./dataPro.js')();
    var getUsers = function () {
        User.find({}, function (err, users) {
            if (err) {
                res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
            } else {
                res.json({ 'success': true, 'info': users });
            }
        });
    }
    var getTags = function () {
        Tag.find({}, function (err, tags) {
            if (err) {
                res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
            } else {
                res.json({ 'success': true, 'info': tags });
            }
        });
    }
    var getNotifications = function (res) {
        Notification.find({}, function (err, nots) {
            if (err) {
                res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
            } else {
                res.json({ 'success': true, 'info': nots });
            }
        });
    }
    var getFeeds = function (res) {
        Feed.find({}, function (err, feeds) {
            if (err) {
                res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
            } else {
                res.json({ 'success': true, 'info': feeds });
            }
        });
    }
    var getMeets = function (res) {
        Meet.find({}, function (err, meets) {
            if (err) {
                res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
            } else {
                res.json({ 'success': true, 'info': meets });
            }
        });
    }
    var getVideos = function (res) {
        Meet.find({}, function (err, videos) {
            if (err) {
                res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
            } else {
                res.json({ 'success': true, 'info': videos });
            }
        });
    }
    var getContacts = function (res) {
        Contact.find({}, function (err, contacts) {
            if (err) {
                res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
            } else {
                res.json({ 'success': true, 'info': contacts });
            }
        });
    }
    var getEvents = function (res) {
        Event.find({}, function (err, events) {
            if (err) {
                res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
            } else {
                res.json({ 'success': true, 'info': events });
            }
        });
    }

    return {
        get_home: function (req, res) {
            Home.findOne({}, function (err, home) {
                if (err) {
                    res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                } else {
                    res.json({ 'success': true, 'info': home });
                }
            })
        },
        signin_facebook: function (req, res) {
            var body = req.body;
            User.findOne({ email: body.email }, function (err, user) {
                if (err) {
                    res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                } else {
                    if (user) {
                        if (dataPro.toHash(body.password) == user.password) {
                            user.receiver_token = body.receiver_token;
                            user.position = body.position;
                            dataPro.saveUser(res, user, function (user) {
                                res.json({ 'success': true, 'user': user });
                            });
                        } else {
                            res.json({ 'success': false, 'error': 'The user does not exist.' });
                        }
                    } else {
                        var newUser = new User({
                            username: body.username,
                            password: dataPro.toHash(body.password),
                            first_name: body.first_name,
                            last_name: body.last_name,
                            phone: body.phone,
                            email: body.email,
                            age: '',
                            city: '',
                            gender: '',
                            pronouns: '',
                            sexuality: '',
                            bio: '',
                            login_type: 'f',
                            position: body.position,
                            receiver_token: body.receiver_token,
                            created_date: moment(),
                            updated_date: moment()
                        });
                        dataPro.saveUser(res, newUser, function (user) {
                            fss.copy('./upload/profile/avatar.png', './upload/profile/' + user._id + '.png', function (err) {
                                if (err) {
                                    res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                                } else {
                                    res.json({ 'success': true, 'user': user });
                                }
                            });
                        });
                    }
                }
            });
        },
        signup_phone: function (req, res) {
            var body = req.body;
            User.findOne({ phone: body.phone }, function (err, user) {
                if (err) {
                    res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                } else {
                    if (user) {
                        res.json({ 'success': false, 'error': 'The user have already existed.' });
                    } else {
                        Tag.find({}, function (err, tags) {
                            if (err) {
                                res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                            } else {
                                var rand = Math.floor((Math.random() * 9000 + 999));
                                res.json({ 'success': true, 'code': rand, 'tags': tags });
                            }
                        });
                    }
                }
            });
        },
        create_user: function (req, res) {
            var body = req.body;
            var newUser = new User({
                username: body.username,
                password: dataPro.toHash(body.password),
                first_name: body.first_name,
                last_name: body.last_name,
                phone: body.phone,
                email: body.email,
                age: body.age,
                city: body.city,
                gender: body.gender,
                pronouns: body.pronouns,
                sexuality: body.sexuality,
                bio: body.bio,
                login_type: 'p',
                position: body.position,
                receiver_token: body.receiver_token,
                created_date: moment(),
                updated_date: moment()
            });
            dataPro.saveUser(res, newUser, function (user) {
                var path = 'upload/profile/' + user._id + '.png';
                fs.writeFile(path, body.file, 'base64', function (err) {
                    if (err) {
                        res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                    } else {
                        var newUserTag = new UserTag({
                            user_id: user._id,
                            tag_id: body.tags
                        });
                        dataPro.saveThing(res, newUserTag, function (user_tag) {
                            res.json({ 'success': true, 'user': user, 'user_tag': user_tag.tag_id });
                        });
                    }
                });
            });
        },
        change_user: function (req, res) {
            var body = req.body;
            User.findOne({ _id: body.id }, function (err, user) {
                if (user) {
                    user.username = body.username;
                    user.first_name = body.first_name;
                    user.last_name = body.last_name;
                    user.age = body.age;
                    user.city = body.city;
                    user.gender = body.gender;
                    user.pronouns = body.pronouns;
                    user.sexuality = body.sexuality;
                    user.bio = body.bio;
                    dataPro.saveUser(res, user, function (user) {
                        res.json({ 'success': true, 'user': user });
                    });
                } else {
                    res.json({ 'success': false, 'error': 'The user does not exist.' });
                }
            });
        },
        change_photo: function (req, res) {
            var body = req.body;
            User.findOne({ _id: body.id }, function (err, user) {
                if (user) {
                    var path = 'upload/profile/' + user._id + '.png';
                    fs.writeFile(path, body.file, 'base64', function (err) {
                        if (err) {
                            res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                        } else {
                            dataPro.saveUser(res, user, function (user) {
                                res.json({ 'success': true });
                            });
                        }
                    });
                } else {
                    res.json({ 'success': false, 'error': 'The user does not exist.' });
                }
            });
        },
        get_me: function (req, res) {
            var id = req.query.id
            User.findOne({ _id: id }, function (err, user) {
                if (user) {
                    UserTag.findOne({ user_id: id }, function (err, user_tag) {
                        if (err) {
                            res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                        } else {
                            Contact.findOne({ user_id: id }, function (err, contacts) {
                                if (err) {
                                    res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                                } else {
                                    Feed.findOne({ user_id: id }, function (err, feeds) {
                                        if (err) {
                                            res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                                        } else {
                                            res.json({ 'success': true, 'user': user, 'user_tag': user_tag.tag_id, 'contacts': contacts, 'feeds': feeds });
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.json({ 'success': false, 'error': 'The user does not exist.' });
                }
            });
        },
        change_user_tag: function (req, res) {
            var body = req.body;
            UserTag.findOne({ user_id: body.id }, function (err, user_tag) {
                if (err) {
                    res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                } else {
                    user_tag.tag_id = body.tag_id;
                    dataPro.saveThing(res, user_tag, function () {
                        res.json({ 'success': true });
                    });
                }
            });
        },
        get_users: function (req, res) {
            getUsers(res);
        },

        //tag
        add_tag: function (req, res) {
            var newTag = new Tag({
                name: req.body.name
            });
            dataPro.saveThing(res, newTag, function () {
                getTags(res);
            });
        },
        change_tag: function (req, res) {
            Tag.findOne({ _id: req.body.id }, function (err, tag) {
                if (err) {
                    res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                } else {
                    tag.name = req.body.name;
                    dataPro.saveThing(res, tag, function () {
                        getTags(res);
                    });
                }
            });
        },
        get_tags: function (req, res) {
            getTags(res);
        },

        //feed
        get_feed: function (req, res) {
            getFeeds(res);
        },
        post_feed: function (req, res) {
            var body = req.body;
            var newFeed = new Feed({
                user_id: body.id,
                content: body.content,
                attached: {
                    type: body.type,
                    url: body.url
                },
                likes: [],
                comments: [],
                created_date: moment()
            });
            dataPro.saveThing(res, newFeed, function () {
                getFeeds(res);
            });
        },
        like_feed: function (req, res) {
            var body = req.body;
            Feed.findOne({ _id: body.id }, function (err, feed) {
                if (feed) {
                    feed.likes.push(body.user_id);
                    dataPro.saveThing(res, feed, function () {
                        getFeeds(res);
                    });
                } else {
                    res.json({ 'success': false, 'error': 'The feed does not exist.' });
                }
            });
        },
        comment_feed: function (req, res) {
            var body = req.body;
            Feed.findOne({ _id: body.id }, function (err, feed) {
                if (feed) {
                    var temp = {
                        id: body.user_id,
                        content: body.comment,
                        created_date: moment()
                    }
                    feed.comments.push(temp);
                    dataPro.saveThing(res, feed, function () {
                        getFeeds(res);
                    });
                } else {
                    res.json({ 'success': false, 'error': 'The feed does not exist.' });
                }
            });
        },

        //meet
        add_meet: function (req, res) {
            var body = req.body;
            var newMeet = new Meet({
                user_id: body.id,
                name: body.name,
                during: body.during
            });
            dataPro.saveThing(res, newMeet, function (meet) {
                var path = 'upload/meet/' + meet._id + '.png';
                fs.writeFile(path, body.file, 'base64', function (err) {
                    if (err) {
                        res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                    } else {
                        getMeets(res);
                    }
                });                
            });
        },
        get_meets: function (req, res) {
            getMeets(res);
        },

        //video
        add_video: function (req, res) {
            var body = req.body;
            var newVideo = new Video({
                url: body.url,
                user_id: body.id,
                during: body.during,
                title: body.title,
                tags: body.tags,
                size: body.size
            });
            dataPro.saveThing(res, newVideo, function () {
                getVideos(res);
            });
        },
        get_videos: function (req, res) {
            getVideos(res);
        },

        //contact
        add_contact: function (req, res) {
            var body = req.body;
            var newContact = new Contact({
                user_id: body.id,
                contact_id: body.contact_id
            });
            dataPro.saveThing(res, newContact, function () {
                getContacts(res);
            });
        },
        get_contacts: function (req, res) {
            getContacts(res);
        },

        //event
        add_event: function (req, res) {
            var body = req.body;
            var newEvent = new Event({
                user_id: body.id,
                type: body.type,
                title: body.title,
                date: body.date,
                content: body.content,
                contacts: [],
                local: body.local,
                created_date: moment()
            });
            dataPro.saveThing(res, newEvent, function (event) {
                var path = 'upload/event/' + event._id + '.png';
                fs.writeFile(path, body.file, 'base64', function (err) {
                    if (err) {
                        res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                    } else {
                        getEvents(res);
                    }
                });                
            });
        },
        add_event_contact: function (req, res) {
            var body = req.body;
            Event.findOne({ _id: body.id }, function (err, event) {
                if (event) {
                    event.contacts.push(body.contact);
                    dataPro.saveThing(res, event, function () {
                        getEvents(res);
                    });
                } else {
                    res.json({ 'success': false, 'error': 'The event does not exist.' });
                }
            });
        },
        get_events: function (req, res) {
            getEvents(res);
        },

        get_chat_room: function(req, res) {
            ChatRoom.find({}, function(err, chat_rooms) {
                if(err) {
                    res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                } else {
                    User.find({}, function(err, users) {
                        if(err) {
                            res.json({ 'success': false, 'error': 'Connection error. Please try again.' });
                        } else {
                            res.json({ 'success': true, 'users': users, 'chat_rooms': chat_rooms });
                        }
                    });
                }
            });
        },

        //notification
        send_not: function (req, res) {
            var body = req.body;
            User.findOne({ '_id': body.id }, function (err, user) {
                if (user) {
                    push.sendPush(user.receiver_token, body.content, function (isDone) {
                        if (isDone) {
                            var newNot = new Notification({
                                target: user._id,
                                content: body.content,
                                created_date: moment()
                            });
                            dataPro.saveThing(res, newNot, function (template) {
                                getNotifications(res);
                            });
                        } else {
                            res.json({ 'success': false, 'error': 'Can not send the notification. Please try again.' });
                        }
                    });
                } else {
                    res.json({ 'success': false, 'error': 'The user does not exist.' });
                }
            });
        },
        get_notifications: function (req, res) {
            getNotifications(res);
        }
    }
}