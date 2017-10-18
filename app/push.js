var gcm = require('node-gcm');
var cfg = require('../config');

module.exports = function () {
    var sender = new gcm.Sender(cfg.gcm_key);

    return {
        sendPush: function (receiver_token, content, next) {
            var message = new gcm.Message();
            //message.addNotification({
            message.addData({
                title: '',
                body: content,
                badge: 1,
                icon: 'ic_launcher',
                sound: 'default'
            });
            sender.send(message, { registrationTokens: [receiver_token] }, function (err, response) {
                if (err) {
                    next(false);
                } else {
                    next(true);
                }
            });
        },
        sendAllPush: function (receiver_tokens, types, content, nums, next) {
            var s_num = 0;
            var f_num = 0;

            var message = new gcm.Message();
            message.addData({
                title: '',
                body: content,
                type: 0,
                icon: 'ic_launcher',
                sound: 'default'
            });

            for (var i = 0; i < receiver_tokens.length; i++) {
                message.badge = nums[i] + 1;
                sender.send(message, { registrationTokens: [receiver_tokens[i]] }, function (err, response) {
                    if (err) {
                        f_num++;
                    } else {
                        s_num++;
                    }
                    if ((f_num + s_num) == receiver_tokens.length) {
                        next(s_num, f_num);
                    }
                });
            }
        }
    }
}