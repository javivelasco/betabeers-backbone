var app = app || {};

(function() {

	'use strict';

	// view for the list
	app.FilmsView = Backbone.View.extend({

		el: '#filmsapp',

		events: {
			'keypress #new-film': 'createFilm'
		},

		template: _.template( $('#list-template').html() ),

		initialize: function() {
			this.collection.on('add', this.addOne, this);
			this.collection.on('reset', this.addAll, this);
		},

		addOne: function(item) {
			var oneFilmView = new app.FilmView({model: item});
			this.$('#films-list').append(oneFilmView.render().el);
		},

		addAll: function() {
			this.$('#films-list').empty();
			this.collection.forEach(this.addOne, this);
		},

		render: function() {
			this.$el.html(this.template());
			this.input = this.$('#new-film');
			this.addAll();
			return this;
		},

		// neccesary because create does not use defaults
		newAttributes: function() {
			return {
				title: this.input.val(),
				votes: 0,
				director: '',
				synopsis: ''
			}
		},

		createFilm: function(event) {
			if (event.which !== 13 || !this.input.val().trim() ) {
				return;
			}
			// create the model with the input
			this.collection.create( this.newAttributes() );
			this.input.val('');
		}
	});
	
})();