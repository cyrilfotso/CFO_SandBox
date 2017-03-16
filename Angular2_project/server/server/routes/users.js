var express = require('express');
var router = express.Router();
var mongoJs = require('mongojs');
var db = mongoJs('mongodb://cyrilF:cyrilFP@ds019966.mlab.com:19966/mytasklist',['users']);


// get all users
router.get('/users', function (req, res, next) {
	db.users.find(function (err, users) {
		if (err) {
			res.send(err);
		} else {
            res.json(users);
		}
	});
});



// test if a user exist
// http://localhost:3000/api/u/isUser?email=$email&pwd=$pwd

router.get('/isUser', function (req, res, next) {
    var user_email = req.query['email'] || 'email'; //req.param('email');
    var user_pwd = req.query['pwd'] || 'pwd';   //req.param('pwd');
    db.users.findOne({ email: user_email, pwd: user_pwd}, function (err, user) {
		if (err) {
			res.send(err);
		} else {
			res.json(user);
		}
	});
});

module.exports = router;