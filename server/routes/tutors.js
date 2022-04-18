var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Tutors');

/* GET home page. */
router.get('/', function(req, res) {
  collection.find({},function(err,tutors){
    if(err) throw err;
    console.log(tutors);
    res.json(tutors);

  })
});

router.get('/:id', function(req, res) {
    collection.find({_id : req.params.id},function(err,tutors){
      if(err) throw err;
      res.json(tutors);
  
    })
  });

  router.get('/:id', function(req, res) {
    collection.find({_id : req.params.id},function(err,tutors){
      if(err) throw err;
      res.json(tutors);
  
    })
  });

  router.post('/', function(req, res) {
    collection.insert({
        name:req.body.name,
        email:req.body.email
    },function(err,tutors){
      if(err) throw err;
      res.json(tutors);
  
    })
  });


  router.put('/:id', function(req, res) {
    collection.update({_id : req.params.id},{$set : {
        name:req.body.name,
        email:req.body.email
    }},function(err,tutors){
      if(err) throw err;
      res.json(tutors);
  
    })
  });

  router.delete('/:id', function(req, res) {
    collection.remove({_id : req.params.id},function(err,tutors){
      if(err) throw err;
      res.json(tutors);
  
    })
  });

module.exports = router;