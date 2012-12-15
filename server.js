
/**
 * Module dependencies.
 */
var express = require('express') ,
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  socket = require('socket.io'),
  stylus = require('stylus'),
  mongoose = require('mongoose'),
  config = require('./config'),
  EventEmitter = require('events').EventEmitter,
  clc = require('cli-color');

// define colors for the console
var red, blue, reset;
red   = '\033[31m';
blue  = '\033[34m';
reset = '\033[0m';

// create the event emitter
var ApiEvent = new EventEmitter();

// connect mongoose
mongoose.connect(config.creds.mongoose_auth,
  {server: {
    poolSize:20,
    auto_reconnect: true
  }});

// create schema
var FilmSchema = new mongoose.Schema({
  title: String,
  director: String,
  synopsis: String,
  votes: Number
});

// use the schema to register a model
mongoose.model('Film', FilmSchema);
var Film = mongoose.model('Film');

// configure express
var app = express();
app.configure(function(){
  app.set('port', process.env['app_port'] || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware({
          src: __dirname + '/stylus',
          dest: __dirname + '/public',
          compile: function (str, path) {
              return stylus(str)
                  .set('filename', path)
                  .set('compress', true)
                  .use(nib())
                  .import('nib');
              }
      }));
  //app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// add cors support
app.all('*', function(req, res, next){
  console.log("RECEIVED: " + req.method);
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

// get one film
function getFilm(req, res, next) {
  Film.findById(req.params.id, function (error,data) {
    res.send(data);
  });
}

// get collection of films
function getFilms(req, res, next) {
  Film.find().limit(100).execFind(function (arr,data) {
    res.send(data);
  });
}

// get all the films
function postFilm(req, res, next) {
  var film = new Film();
  film.title = req.body.title;
  film.director = req.body.director;
  film.synopsis = req.body.synopsis;
  film.votes = req.body.votes;
  film.save(function (err, obj) {
    res.send(obj);
    ApiEvent.emit('api:films:change', obj);
  });
}

// put new attributes on a film
function putFilm(req, res, next) {
  Film.findById(req.params.id, function(err, p) {
    p.director = req.body.director;
    p.synopsis = req.body.synopsis;
    p.title = req.body.title;
    p.votes = req.body.votes;
    p.save(function (error, obj) {
      res.send(obj);
      ApiEvent.emit('api:films:change', obj);
    });
  });
}

// delete a film from the database
function deleteFilm(req, res, next) {
  console.log("trying to delete");
  Film.findById(req.params.id, function(err, p) {
    p.remove(function(error, obj) {
      res.send(obj);
      ApiEvent.emit('api:films:change', obj);
    });
  });
}

// define the routes
app.get('/', routes.index);
app.get('/api/films/:id', getFilm);
app.put('/api/films/:id', putFilm);
app.delete('/api/films/:id', deleteFilm);
app.get('/api/films', getFilms);
app.post('/api/films', postFilm);

// create the server
server = http.createServer(app);

// socketIO listening
var io = socket.listen(server);
var n_clients = 0;

// a new client is connected
io.sockets.on('connection', function(client) {

  // add the client and emits a broadcast message
  n_clients += 1;
  client.broadcast.emit('clients:hi', n_clients);
  console.log(clc.green("[Socket]") +
    " New client connected ::: total " + n_clients);

  // client is disconnected and decrease the counter
  client.on('disconnect', function() {
    n_clients -= 1;
    client.broadcast.emit('clients:bye', n_clients);
    console.log(clc.green("[Socket]") +
      " Client disconnected ::: total " + n_clients);
  });

  // when a new film is added by a client
  ApiEvent.on('api:films:change', function(obj) {
    client.emit('api:films:change', obj);
  });

});

// express server listening
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
