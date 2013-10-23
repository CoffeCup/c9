
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var controller = require(__dirname + '/controllers/index.js');
var init_data = require(__dirname + '/controllers/init_data.js');
var files = require(__dirname + '/controllers/files.js');
var http = require('http');
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// mount routers


app.get('/', controller.index);
app.post('/init' , init_data.index);
app.post('/files/get_folder' ,files.get_folder);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
