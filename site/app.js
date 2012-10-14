
// when the dom is ready
$(function(){

// defining a model of film
var FilmModel = Backbone.Model.extend({
	urlRoot: 'http://localhost:3000/api/films',
	parse: function(response, xhr) {
		response.id = response._id;
		return response;
	}
});

// defining a view for our model
var FilmView = Backbone.View.extend({

	tagName: 'li',

	events: {
		'click .destroy': 'destroyFilm'
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
		console.log(this.model.destroy());
	}
});





// defining a collection of films
var FilmCollection = Backbone.Collection.extend({
	url: 'http://localhost:3000/api/films',
	parse: function(response, xhr) {
		_.map(response, function(item) {
			item.id = item._id;
			return item;
		});
		return response;
	}
});

// instantiate a film collection
window.films = new FilmCollection();






// view for the list
var FilmListView = Backbone.View.extend({

	el: '#filmsapp',

	events: {
		'keypress #new-film': 'createFilm'
	},

	initialize: function() {
		this.input = this.$('#new-film');

		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.addAll, this);
	},

	addOne: function(item) {
		var oneFilmView = new FilmView({model: item});
		this.$('#films-list').append(oneFilmView.render().el);
	},

	addAll: function() {
		this.$('#films-list').empty();
		this.collection.forEach(this.addOne, this);
	},

	render: function() {
		this.addAll();
		return this;
	},

	newAttributes: function() {
		return {
			title: this.input.val(),
			director: 'unknown'
		}
	},

	createFilm: function(event) {
		if (event.which !== 13 || !this.input.val().trim() ) {
			return;
		}
		// create the model
		this.collection.create( this.newAttributes() );
		this.input.val('');
	}

});









	// instantiate a collection
	window.filmsView = new FilmListView({collection: films});
	window.filmsView.render();
});





// connect to socketIO
var server = io.connect('http://localhost:3000');

// inform about the number of clients connected
server.on("clients:hi", function(data) {
	console.log("New client connected ::: total " + data);
});

// inform if a client is disconnected
server.on("clients:bye", function(data) {
	console.log("A client has been disconnected ::: total " + data);
});

// add a new model when it's posted to the server
server.on("api:film:new", function(obj) {
	/*var m = new FilmModel();
	m.set(obj);	
	films.add(m);*/
	films.fetch();
});


