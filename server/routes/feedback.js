var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Feedback');
const auth = require('./middleware/auth');

router.get('/:user_id/:tutor_id',auth, function(req, res) {
    collection.find({user_id : monk.id(req.params.user_id), tutor_id : monk.id(req.params.tutor_id)},function(err,feedback){
      if(err) throw err;
      res.json(feedback);
  
    })
  });

  router.get('/:tutor_id',auth, function(req, res) {
    collection.find({tutor_id : monk.id(req.params.tutor_id)},function(err,feedback){
      if(err) throw err;
      res.json(feedback);
  
    })
  });

  router.post('/',auth, function(req, res) {
    collection.insert({
        user_id:monk.id(req.body.user_id),
        tutor_id:monk.id(req.body.tutor_id),
        rating:parseInt(req.body.rating),
        comment:req.body.comment
    },function(err,feedback){
      if(err) throw err;
      res.json(feedback);
  
    })
  });

  router.put('/:id', auth, function(req, res) {
    collection.update({_id : monk.id(req.params.id)},{$set : {
      rating:parseInt(req.body.rating),
      comment:req.body.comment
    }},function(err,feedback){
      if(err) throw err;
      res.json(feedback);
  
    })
  });




  router.delete('/:user_id/:tutor_id',auth, function(req, res) {
    collection.remove({user_id : monk.id(req.params.user_id), tutor_id : monk.id(req.params.tutor_id)},function(err,feedback){
      if(err) throw err;
      res.json(feedback);
  
    })
  });

  module.exports = router;