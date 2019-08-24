var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require("fs");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'html');

app.get('/', (req, res) => res.send('Hello World!'))
console.log("Startingu p");
app.post('/sms', (req, res) => {
  // const twiml = new MessagingResponse();
  //
  // twiml.message('The Robots are coming! Head for the hills!');
  console.log("DFSDFDSF")
  console.log(req.body)
  console.log(req.body.Body);
  fs.appendFileSync('incomingMessages', req.body.Body+'\r\n');
  //
  // res.writeHead(200, {'Content-Type': 'text/xml'});
  res.send("Message received!");
  // res.json({
  //   message: req.body.Body
  // });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');//this or res.status(err.status || 500).send('error')
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports = app;
