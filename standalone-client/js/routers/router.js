var app = app || {};

(function() {

	'use strict';

	// create the router
	app.Router = Backbone.Router.extend({

		routes: {
			"": "index",
			"films/:id": "film"
		},

		// executed when first created
		initialize: function() {
			app.films = new app.Films();
			app.filmsView = new app.FilmsView({collection: app.films});
		},

		start: function() {
			Backbone.history.start();
		},

		// actions for index
		index: function() {
			app.filmsView.render();
			app.films.fetch();
		},

		// actions for one film
		film: function(identificator) {
			app.film = new app.Film({id: identificator});
			app.filmView = new app.FilmViewDetail({model: app.film});
			app.film.fetch();	
		}
	});

})();