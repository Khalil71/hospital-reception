const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const url = 'mongodb://lindera:abc123@ds115758.mlab.com:15758/lindera';

const routes = require('./src/routes/routes');

let app = express();
let port = process.env.PORT || 3000;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function mongoConnect() {
  console.log('mongoose connection success'); // eslint-disable-line
});
mongoose.set('useCreateIndex', true);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal Error');
  next();
});

app.listen(port, () => {
  console.log('now listening on port ' + port); // eslint-disable-line
});
