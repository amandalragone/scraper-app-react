//Requiring NPM packages
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Requiring DB models
var db = require("./models");

var PORT = process.env.PORT || 3001;

// Initializing Express
var app = express();

// Configuring middleware
// Using morgan logger for logging requests
app.use(logger("dev"));
// Parsing request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Making public a static folder
app.use(express.static("public"));

// Connecting to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Starting the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
