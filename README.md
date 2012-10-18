Betabeers Backbone.js API server
==================================

A simple API built with [Node.js](http://nodejs.org/), [Express](http://expressjs.com/), [SocketIO](http://socket.io/) & [MongoDB](http://www.mongodb.org/) for supporting the development of a sample application for the Betabeers meeting at Cordoba. You can use the deployed project [here](http://betabeers-backbone.nodester.com). For now, the system work with just a film scheme with the attributes:

1. ID
2. Title
3. Director
4. Synopsis

Consider that the ID attribute used in MongoDB is called _id so, in other to integrate properly with Backbone.js, you have to set the parse method to match _id with id. It's also important to note that the server allows all origins because I wanted to build the clients in a separate site without using any auth protocol. 

## Methods

The API has the following methods around one single object, and other requests will result an error:

* GET /films - Get all the films
* POST /films - Create new film
* PUT /films/id - Modify film with id
* DELETE /films/id - Delete film with id

## Socket.IO

In order to improve the dynamism of the workshop, I've used [SocketIO](http://socket.io/) so when a client connects, an event is broadcasted to all the other clients. Each time the list changes (POST/PUT/DELETE request), an event is also broadcasted and the clients can update the models in real time. Check out the client-side code at the [Client App Skeleton](https://github.com/javivelasco/betabeers-backbone-skeleton).

## Install

If you want to install the server to try it localy, you just have to clone the repo and run the following commands:

	npm install
	node server.js

If you wanna use your own DB instead of the one I've created to the workshop, you can do it at [MongoLab](https://mongolab.com/home). The config can be found in config.js so you can easily change the URL to yours. Once your server is running, you can go to the [Client App Skeleton](https://github.com/javivelasco/betabeers-backbone-skeleton) and start completing it.

## TODO

* Port the client to the server side using Jade & Stylus