var app = app || {};

(function() {

	'use strict';

	app.FilmView = Backbone.View.extend({

		tagName: 'li',

		events: {
			'click .destroy': 'destroyFilm',
			'click .vote': 'vote'
		},

		template: _.template( $('#item-template').html() ),

		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		destroyFilm: function() {
			this.model.destroy();
		},

		vote: function() {
			var n = this.model.get('votes');
			this.model.set({votes: n+1});
			this.model.save();
		}
	});

})();