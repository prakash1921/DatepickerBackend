var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var port = process.env.port || 8000;
var app = express();
var cors = require('cors');
// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit:'50mb', extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
const mongoUrl='mongodb://localhost/Ecommerce'

var conc = mongoose.connect(mongoUrl,
  (err)=>{
      if(err){
      console.log("Error connect to mongoose TOUCH",err)
  }
  else{

      console.log("mongoose connected ")
  }
  });
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(express.static(path.join(__dirname,"/public"),{maxAge:31557600000000}));
app.use(express.static(path.join(__dirname,"/public/uploads"),{maxAge:31557600000000}));
// app.engine('hbs', hbs({extname: 'hbs',defaultLayout:'layout',layoutDir:_dirname + '/views/layout/'}));
// app.set('views',path.join(_dirname,'/views')); //set path in which file is present
app.set('view engine','hbs');
app.listen(port);

//package.json
// "private": true,
// "scripts": {
  //   "start": "node ./bin/www"
  // },
module.exports = app;
