var express = require('express');
var router = express.Router();
var mongoJs = require('mongojs');
var db = mongoJs('mongodb://cyrilF:cyrilFP@ds019966.mlab.com:19966/mytasklist',['tasks']);


// get all task
router.get('/tasks', function (req, res, next) {
	db.tasks.find(function (err, tasks) {
		if (err) {
			res.send(err);
		} else {
			res.json(tasks);
		}
	});
});



// get single task
router.get('/task/:id', function (req, res, next) {
	db.tasks.findOne({ _id: mongoJs.ObjectId(req.params.id) }, function (err, task) {
		if (err) {
			res.send(err);
		} else {
			res.json(task);
		}
	});
});

// Save a task
router.post('/task', function (req, res, next) {
	var task = req.body;
	/*if (!task.title || (task.isDone + '')){
		res.status(400);
		res.json({"error":"Bad data"});
	} else {*/
		db.tasks.save(task, function (err, task) {
			if(err){
				res.send(err);
			} else {
				res.json(task);
			}
		});
	//}
});


// delete a task
router.delete('/task/:id', function (req, res, next) {
	db.tasks.remove({ _id: mongoJs.ObjectId(req.params.id) }, function (err, task) {
		if (err) {
			res.send(err);
		} else {
			res.json(task);
		}
	});
});


// update a task
router.put('/task/:id', function (req, res, next) {
	var task = req.body;
	var updtask = {};

	if (task.isDone) {
		updtask.isDone = task.isDone;
    } else {
        updtask.isDone = task.isDone;
    }

	if (task.title) {
		updtask.title = task.title;
    }
    updtask.timeStart = task.timeStart;
    updtask.timeEnd = task.timeEnd;

	if(!updtask){
		res.status(400);
		res.json({"err":"Bad Data"});
	} else {
		db.tasks.update({ _id: mongoJs.ObjectId(req.params.id) },updtask, {}, function (err, task) {
			if (err) {
				res.send(err);
			} else {
				res.json(task);
			}
		});
	}
	
});

module.exports = router;