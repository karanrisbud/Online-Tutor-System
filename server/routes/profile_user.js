var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Users');
const auth = require('./middleware/auth');

router.get('/:id', auth, function(req, res) {
    collection.find({_id : req.params.id},function(err,users){
        if(err) throw err;
        res.json(users);
    })
});

router.put('/:id', auth, function(req, res) {
    collection.update({_id : req.params.id},{$set : {
      mobile_no:req.body.mobile_no,
      name:req.body.name,
      username:req.body.username,
      image:req.body.image
    }},function(err,profile){
      if(err) throw err;
      res.json(profile);
  
    })
  });

  module.exports = router;