var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Tutors');

router.get('/:id', function(req, res) {
    collection.find({_id : req.params.id},function(err,users){
        if(err) throw err;
        res.json(users);
    })
});

router.put('/:id', function(req, res) {
    collection.update({_id : req.params.id},{$set : {
      subject:req.body.subject,
      image:req.body.image
    }},function(err,favourites){
      if(err) throw err;
      res.json(favourites);
  
    })
  });

  module.exports = router;