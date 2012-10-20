var app = app || {};

(function() {

	'use strict';

	// defining the model
	app.Film = Backbone.Model.extend({
		defaults: {
			title: '',
			director: '',
			votes: 0,
			synopsis: ''
		},
		urlRoot: window.serverURL + 'api/films',
		parse: function(response, xhr) {
			response.id = response._id;
			return response;
		}
	});

})();