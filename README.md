Backbone.js APP for Betabeers
=============================

This project consists of a Backbone.js application for building real-time collaborative movie listings using [Node.js](http://nodejs.org/),[Express](http://expressjs.com/), [Jade](http://jade-lang.com/), [Stylus](http://learnboost.github.com/stylus/), [Backbone.js](http://backbonejs.org/), [Socket.io](http://socket.io/) and [MongoDB](http://www.mongodb.org/). When a user connect to the site, he can create, edit, vote, or delete movies. All connected users will see the changes in real-time. The project consists of two main components: the application and a RESTful API.

## The application

The application has been built using [Backbone.js](http://backbonejs.org/) and you can see it deployed in [Nodester](http://nodester.com/) [here](http://betabeers-backbone.nodester.com). It has two views: the movie list and the detail of a movie. In the first, there is a field to create movies and in the latter, each field can be edited by double clicking on it. There are two versions:

* Deployed version: this version has been developed to be deployed on a server with Node.js and it uses Express, Jade and Stylus. The socket.io script is generated from the server.
* Standalone version: this version can run on any browser and it has been coded using HTML + CSS directly (plus Backbone.js and other JS libraries). You can find it within the standalone-client folder. The socket.io script has been included and modified to connect with the API using [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).

## The API

The API has been built using Express for handling requests, and [MongoDB](http://www.mongodb.org/) with [Mongoose ODM](http://mongoosejs.com/) for storing and retrieving data. It has been built as a RESTful API so that it can integrate properly with Backbone.js on the client side. The schema defined for each film has as attributes: ID, title, director and synopsis. The API has the following methods for interacting with films, other requests will result an error:

* GET /api/films - Get all the films
* POST /api/films - Create new film
* PUT /api/films/id - Modify film with id
* DELETE /api/films/id - Delete film with id

## Real-Time

In order to improve the dynamism of the workshop, I've used [socket.io](http://socket.io/) as mentioned above, so when a client connects, an event is broadcasted to all the other clients. Each time the list changes (POST/PUT/DELETE request), an event is also broadcasted and the clients can update the models in real time.

## Install

If you want to install the server to try it localy, you just have to clone the repo and run the following commands:

	npm install
	node server.js

If you wanna use your own DB instead of the one I've created to the workshop, you can do it at [MongoLab](https://mongolab.com/home). The config can be found in config.js so you can easily change the URL to yours.

## About

This project has been developed for supporting my Backbone.js workshop at Betabbers meeting in Córdoba (October 18th, 2012). You can find the slides in Betabeers [website](http://betabeers.com/) and the skeleton for completing the app on your own [here](https://github.com/javivelasco/betabeers-backbone-skeleton).