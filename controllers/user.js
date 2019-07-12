const router = require("express").Router();
var db = require("../../models");

var cors = require("cors");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

router.use(cors());
process.env.SECRET_KEY = "secret";


router.get("/", function(req, res) {
  console.log("Hi");
});

router.get("/welcome", function(req, res) {
  db.User.findAll({})

    .then(function(response) {
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/welcome/:email/:password', function (req, res) {
  db.User.findOne({
    where: {
      email: req.params.email
    }
  }).then(function (response) {
    if (!response) {
      res.send("You haven't registered an account yet. Click Create New Account to get started.");
    } else {
      bcrypt.compare(req.params.password, response.password, function (err, result) {
        res.json(result);
      });
    }
  });
});

router.get("/welcome/:email", function(req, res) {
  
  db.User.findOne({
    where: {
      email: req.params.email
    }
  })

    .then(function(response) {

      console.log(response);
      res.json({
        userID: response.dataValues.id,
        name: response.dataValues.name
      });
    })
    .catch(err => {
      console.log(err);
      res.send("Error: " + err);
    });
});

router.post("/create", function(req, res) {
  var { userName, email, password } = req.body;

  console.log(userName, email, password);

  var hash = bcrypt.hashSync(password, 10);
  password = hash;

  console.log(password);

  // edited burger create to add in a burger_name
  db.User.create({
    name: userName,
    email: email,
    password: password
  })
    // pass the result of our call
    .then(function(response) {

      var token = jwt.sign(response.dataValues, process.env.SECRET_KEY, {
        expiresIn: 1440 
      });
     
      console.log(response.dataValues.id, response.dataValues.name);
      res.json({
        userID: response.dataValues.id,
        name: response.dataValues.name,
        token: token
      });
    })
    .catch(err => {
      console.log(err);
      res.send("Error: " + err);
    });
});

module.exports = router;
