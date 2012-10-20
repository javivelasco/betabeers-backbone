var app = app || {};

(function() {

	'use strict';

	app.FilmViewDetail = Backbone.View.extend({

		el: '#filmsapp',

		events: {
			"dblclick li": 	"edit",
			'keypress input': 'modifyField',
			'keypress textarea': 'modifyField'
		},

		template: _.template( $('#detail-template').html() ),

		initialize: function() {
			this.model.on('change', this.render, this);
		},

		render: function() {
			this.$el.empty();
			if (!this.model.isNew())
				this.$el.html(this.template(this.model.toJSON()));
			return this;
		}, 

		edit: function(event) {
			$(event.currentTarget).children("article").hide();
			$(event.currentTarget).children("h3").hide();
			$(event.currentTarget).children("input").show();
			$(event.currentTarget).children("textarea").show();
		},

		modifyField: function(event) {
			//if (event.which !== 13 || !$(event.currentTarget).val().trim() ) {
			if (event.which !== 13 ) {
				return;
			}
			var field = $(event.currentTarget).data('name');
			var value = $(event.currentTarget).val();
			if (value === this.model.get(field)) {
				this.render();
				return;
			}
			this.model.set(field, value);
			this.model.save();
		}
	});

})();