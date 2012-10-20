var app = app || {};

(function() {

	'use strict';

	// define the collection
	app.Films = Backbone.Collection.extend({
		url: window.serverURL + 'api/films',
		parse: function(response, xhr) {
			_.map(response, function(item) {
				item.id = item._id;
				return item;
			});
			return response;
		}
	});

})();
