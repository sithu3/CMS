var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose=require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userapiRouter = require('./api/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://sithu:sithu123@ds247827.mlab.com:47827/lastcmd');
//mongodb+srv://sithu:sithu@lastcmd-jgd2p.mongodb.net/test?retryWrites=true&w=majority
//mongodb://sithu:sithu123@ds247827.mlab.com:47827/lastcmd
//mongoose.connect('mongodb+srv://sithu:sithu2019@lastcmd-ilxmz.mongodb.net/test?retryWrites=true&w=majority&ssl=true', { dbName: 'lastcmd' })
//  .then( () => {
//    console.log('Connection to the Atlas Cluster is successful!')
//  })
//  .catch( (err) => console.error(err))
//mongoose.connect('mongodb://127.0.0.1/lastcmd');
//var db = mongoose.connection;
//db.on('error',console.error.bind(console,'MongoDB connection error:'))

//mongodb+srv://sithu:database@cluster0-w3bod.mongodb.net/test?retryWrites=true&w=majority
//mongodb://127.0.0.1/last_CMD
//"mongodb+srv://cluster0-w3bod.mongodb.net/test" --username sithu
//mongodb+srv://cluster0-cdc59.mongodb.net/test" --username sithu
//mongodb+srv://cluster0-w3bod.mongodb.net/test" --username sithu
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
// app.use(session({
//   secret:'@vsdjkfskvngf',
//   resave:false,
//   saveUninitalized:true
// }))
//
// app.use(function(req,res,next){
//   res.locals.user=req.session.user;
//   next();
// })
//
// app.use('/', indexRouter);
// app.use(function(req,res,next){
//   if(req.session.user){
//     next();
//   }
//   else{
//     res.redirect('/signin')
//   }
// })
//close session

app.use('/', indexRouter);
app.use('/api/users', userapiRouter);
app.use('/users', usersRouter);


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
  res.render('error');
});

module.exports = app;
