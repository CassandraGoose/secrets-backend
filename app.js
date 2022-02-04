const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
require('dotenv').config();

if (process.env.NODE_ENV !== 'test') {
  const logger = require('morgan');
  app.use(logger('dev'));
}

app.use(bodyParser.json());

app.options('*', cors());

app.use(cors({
  origin: 'https://secret-keeper.surge.sh/'
}));

app.use('/secrets', require('./routes/secrets'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

app.listen(process.env.PORT || 3000);
