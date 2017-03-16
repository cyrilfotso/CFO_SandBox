var express = require('express');
var router = express.Router();
var mongoJs = require('mongojs');
var db = mongoJs('mongodb://cyrilF:cyrilFP@ds019966.mlab.com:19966/mytasklist', ['products']);


// get all products
router.get('/products', function (req, res, next) {
    db.products.find(function (err, products) {
		if (err) {
			res.send(err);
		} else {
            res.json(products);
		}
	});
});



// get single product
// http://localhost:3000/api/p/getproduct?id=id
router.get('/product/:id', function (req, res, next) {
    db.products.findOne({ _id: mongoJs.ObjectId(req.params.id)}, function (err, product) {
		if (err) {
			res.send(err);
		} else {
            res.json(product);
		}
	});
});

// Save a product
router.post('/product', function (req, res, next) {
    var product = req.body;
    db.products.save(product, function (err, product) {
			if(err){
				res.send(err);
			} else {
				res.json(product);
			}
		});
});


// delete a product
router.delete('/product/:id', function (req, res, next) {
    db.products.remove({ _id: mongoJs.ObjectId(req.params.id) }, function (err, product) {
		if (err) {
			res.send(err);
		} else {
            res.json(product);
		}
	});
});


// update a product
router.put('/product/:id', function (req, res, next) {
    var product = req.body;
    var updProduct = product;

    if (!updProduct){
		res.status(400);
		res.json({"err":"Bad Data"});
    } else {
        db.products.update({ _id: mongoJs.ObjectId(req.params.id) }, updProduct, {}, function (err, product) {
			if (err) {
				res.send(err);
			} else {
                res.json(product);
			}
		});
	}
	
});

module.exports = router;