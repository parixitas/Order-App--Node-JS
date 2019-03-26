var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../models/Order.js');

/* GET ALL ORDERS */
router.get('/', function(req, res, next) {
  Order.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE ORDER BY ID */
router.get('/:id', function(req, res, next) {
  Order.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE ORDER */
router.post('/', function(req, res, next) {
  var a = Math.floor(100000 + Math.random() * 900000);   
    a = String(a);
    a = a.substring(0,4);
           Order.create({
            name:"test",
            price:a,
            status:"created"
           }, function (err, post) {
               return res.status(200).send({
                code: 100,
                message: 'Order Create Successfully.',
            })
              });
        
    });

/* UPDATE ORDER */
router.put('/:id', function(req, res, next) {
  Order.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ORDER */
router.delete('/:id', function(req, res, next) {
  Order.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.post('/updatestatus', function(req, res, next) {

  var status="";
  if(req.body.status =="declined"){
    status = "canceled";
  }
  else if(req.body.status =="confirmed"){
    status = "confirmed";
  }


   Order.update({ _id: req.body.id }, { $set: { "status": status} }, function (err, order) {

       if (err) throw err

        return res.status(200).send({
            code: 0,
            message: 'Order Status updated.',
        })


   });

});



module.exports = router;
