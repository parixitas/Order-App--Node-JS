var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../models/Order.js');


router.post('/', function(req, res, next) {

	var myArray = [
  "declined",
  "confirmed",
];

	Order.findOne({_id:req.body.id}, function (err, order) {

		if(!order){
			 return res.status(200).send({
                code: 100,
                message: 'Order not found',
            })
		}

		var randomItem = myArray[Math.floor(Math.random()*myArray.length)];

		 return res.status(200).send({
                code: 0,
                message: 'Order status changed.',
                status:randomItem
            })


	});


});
module.exports = router;