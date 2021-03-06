var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tutorsRouter = require('./routes/tutors');
var appointmentsRouter = require('./routes/appointments');
var favouritesRouter = require('./routes/favourites')
var profileUserRouter = require('./routes/profile_user')
var profileTutorRouter = require('./routes/profile_tutor')
var feedbackRouter = require('./routes/feedback')
var appointmentstutorRouter = require('./routes/appointments_tutor')

var app = express();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tutors', tutorsRouter);
app.use('/appointments', appointmentsRouter);
app.use('/appointments_tutor', appointmentstutorRouter);
app.use('/favourites', favouritesRouter);
app.use('/profile_user', profileUserRouter);
app.use('/profile_tutor', profileTutorRouter);
app.use('/feedback', feedbackRouter);
const fileUpload = require('express-fileUpload')


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(fileUpload());
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
