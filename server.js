//Requiring NPM packages
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

const routes = require("./controllers");

// Requiring DB models

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

app.use(routes)

// Connecting to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Starting the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
