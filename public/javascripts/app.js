var app = app || {};

// when the dom is ready
$(function() {

	// create the router
	app.router = new app.Router();
	app.router.start();

	// configure the sockets
	app.server = io.connect('http://betabeers-backbone.nodester.com:80');

	// client connected
	app.server.on("clients:hi", function(data) {
		console.log("New client connected (" + data + " total) ");
	});

	// client disconnected
	app.server.on("clients:bye", function(data) {
		console.log("Client disconnected (" + data + " total) ");
	});

	// collection changed
	app.server.on("api:films:change", function(obj) {
		app.films.fetch();
	});

});
