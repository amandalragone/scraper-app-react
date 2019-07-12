const router = require("express").Router();
var db = require("../../models");

router.get("/", function(req, res) {
  console.log("Hi");
});

// After the user signs in, the code will read the DB. Then, it will render the friends in the welcome page
router.get("/list/:id", function(req, res) {
  
  db.Friend.findAll({
    where: {
      UserId: req.params.id
    },
    include: [db.User]
  })
    
    .then(function(response) { 
    res.json(response);
    }).catch(err => {
      console.log(err);
      
    });
});

//Route to post a new friend into the DB
router.post("/create/:id", function(req, res) {
  const { name, friendDOB, friendRelationship } = req.body;
  const id = req.params.id;

  console.log(name, friendDOB, friendRelationship, id);
  
  db.Friend.create({
    name: name,
    dateOfBirth: friendDOB,
    relationship: friendRelationship,
    UserId: id
  })
    .then(function(response) {

      res.json({
        name: response.dataValues.name,
        friendDOB: response.dataValues.dateOfBirth,
        friendRelationship: response.dataValues.relationship,
        friendID: response.dataValues.id
      });
      
    }).catch(err => {
      console.log(err);
    });
});

//Route to delete friend
router.get("/delete/:id", function(req, res){
  res.send("delete worked" + req.params.id)
})


module.exports = router;