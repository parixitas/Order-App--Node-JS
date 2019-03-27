# Order and Payment Service


To run this app:

* Run `npm install`
* Run `npm run build`
* Run `npm start`

App will run on localhost:3000/

Endpoints:

POST : http://localhost:3000/api/order -> Create order in db.

POST : http://localhost:3000/api/payment -> Call payment check order details and return random status.

POST : http://localhost:3000/api/order/updatestatus -> update status of order return by payment call.

And there is cron job which run every 1 min and update status of confirmed order to delivered.

