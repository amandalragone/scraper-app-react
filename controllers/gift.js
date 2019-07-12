const router = require("express").Router();
var db = require("../../models");

//Route to read all gifts from the DB
router.get("/list", function(req, res) {
  
  db.Gift.findAll()
    .then(function(response) { 
      res.json(response);
    }).catch(err => {
      console.log(err);
      
    });
});

//Route to read all gifts added to a specific friend
router.get("/list/:id", function(req, res) {
  
  db.Gift.findAll({
    where: {
      FriendId: req.params.id,
      completed: false
    },
    include: [db.Friend]
  })
    
    .then(function(response) { 
      res.json(response);
    }).catch(err => {
      console.log(err);
      
    });
});

// post route to create gifts
router.post("/create/:id", function(req, res) {
  const { itemName, comments, price } = req.body;
  const id = req.params.id;

  console.log(itemName, comments, price, id);
  
  db.Gift.create({
    itemName: itemName,
    comments: comments,
    price: price,
    FriendId: id
  })
    // pass the result of our call
    .then(function(response) {

      res.json(response);
     
    }).catch(err => {
      console.log("there was a problem", err);
    });
});

//Route to update gifts
router.put("/update/:id", function(req, res) {

  db.Gift.update({
    completed: true
  },{
    where: {
      id: req.params.id
    }
  })
    .then(function(response) {
      res.json(response);
    });
});

module.exports = router;
