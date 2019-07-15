const router = require("express").Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

router.get("/", function(req, res) {
  console.log("Hi")
});

router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.bbc.com/news").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      
      $(".nw-c-top-stories").find('div > .gs-c-promo-body > div').each(function(i, element){

        var result = {};

        result.title = $(this)
        .find("a")
        .children("h3")
        .text();

        result.link =  $(this)
        .children("a")
        .attr("href");

        result.summary = $(this)
        .children("p")
        .text();

        db.Article.findOne({
          title: result.title
        }).then(response => {

          if (response) {
            console.log("Article exists")
          } else {
            db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
          }

        }).catch(err => console.log(err))

      })

    // Send a message to the client
    res.send("Scrape Complete");
    });

});

router.get("/findarticles", function(req, res) {

  db.Article.find({}).then(response => res.json(response)).catch(err => console.log(err))

})

  // Route for grabbing a specific Article by id, populate it with it's note
  router.get("/savedarticles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
        console.log(dbArticle)
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });


  });
  
  // Route for saving/updating an Article's associated Note
  router.post("/articles/:id", function(req, res) {


    var { comment } = req.body;

    // Create a new note and pass the req.body to the entry
    db.Note.create({
      body: comment
    })
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true }, {useFindAndModify: false});
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        console.log(response)
        res.json(dbArticle);
        
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


  router.get("/seeComments/:id", function(req, res) {
    db.Article.find({ _id: req.params.id }).then(response => {
      
      console.log(response)

      response.forEach(element => {
          db.Note.find({__id: element.note}).then(response => {
            res.json(response)
          }).catch(err => res.send(err))
      })
      
    }).catch(err => console.log(err))
  })

module.exports = router;