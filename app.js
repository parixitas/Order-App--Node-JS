var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cron = require('node-cron');
var Order = require('./models/Order.js');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/NodeAssign', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var order = require('./routes/order');
var payment = require('./routes/payment');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/order', order);
app.use('/api/payment', payment);

cron.schedule('* * * * *', () => {

   Order.find({  "status": "confirmed"},function(err,orders){

      for(var i = 0; i < orders.length;i++){
          Order.update({_id:orders[i]._id},{$set:{"status" : "delivered" }}, function (err, ride) {
               console.log("Status delivered of left order");

               });
      }


   });



});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
