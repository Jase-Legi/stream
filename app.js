const express = require('express'),
      app = express(),
      http = require('http'),
      path = require('path');
    require('dotenv').config();
var favicon = require('serve-favicon');
var logger = require('morgan');
var debug = require('debug');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('node-gyp-install');
//var mongoose = require('mongoose');
var mongo = require('mongodb');
var mongoclient = mongo.MongoClient;
//var monk = require('monk');
//var passport = require('passport');
var session = require('express-session');
//var flash = require('connect-flash');
var userloggedinfo = require('./config/models/user.js');
var loggedstatus = userloggedinfo.methods.loggedstat;
// Connection URL
var configdburl = require('./config/database.js');
// Retrieve
var db;
var ObjectId = mongo.ObjectID;
// Connect to the db
mongoclient.connect( process.env.DB_URI, function(err, datab) {
    if(!err) {
        db = datab;
        db.listCollections().toArray((er,coll)=>{
            for(var i=0;i<coll.length;i++){
                console.log((i+1)+') collection name: '+coll[i].name);
            }
        });
    console.log("We are connected----");
  }else{
      console.log(err);
  }});

//MAKE ROUTES ACCESSIBLE
app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret:process.env.SESSIONSECRRET,
    resave:false,
    saveUninitialized:true//,
    //cookie: { maxAge: 1800*6000*1000 }
}));

app.use(function(req,res,next){
    req.db = db;
    req.ObjectId = ObjectId;
    next();
});

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


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

// sets port 8080 to default or unless otherwise specified in the environment
//var port = normalizePort(process.env.PORT || 8000);
//app.set( 'port', ( process.env.PORT || 8000));

/*app.get('/', function(req, res){
    res.send('hello world');
});*/

/*app.listen(app.get('port'), ()=>{
    console.log('Node server is running on port ' + app.get( 'port' ));
});*/


module.exports = app;
