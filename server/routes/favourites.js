var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Favourites');
var collection_users = db.get('Users');
var collection_tutors = db.get('Tutors');
const auth = require('./middleware/auth');

    router.get('/', auth, function(req, res) {
        collection.find({},function(err,favourites){
            if(err) throw err;
            res.json(favourites);
        })
    });
  
    router.get('/:id', auth, function(req, res) {
        collection.find({user_id : req.params.id},function(err,favourites){
            if(err) throw err;
            res.json(favourites);
        })
    });

    router.get('/:id/:fav_id', auth, function(req, res) {
        collection.find({_id : req.params.fav_id},function(err,favourites){
          if(err) throw err;
          res.json(favourites);
      
        })
    });
  
    router.post('/:id', auth, function(req, res) {
      collection.insert({
          user_name:req.body.user_name,
          user_id:req.params.id,
          tutor_name:req.body.tutor_name,
          tutor_id:req.body.tutor_id,
          subject:req.body.subject
      },function(err,favourites){
        if(err) throw err;
        res.json(favourites);
    
      })
    });
  
  
    router.put('/:id/:fav_id', auth, function(req, res) {
      collection.update({_id : req.params.fav_id},{$set : {
        user_name:req.body.user_name,
        user_id:req.params.id,
        tutor_name:req.body.tutor_name,
        tutor_id:req.body.tutor_id,
        subject:req.body.subject,
      }},function(err,favourites){
        if(err) throw err;
        res.json(favourites);
    
      })
    });
  
    router.delete('/:id/:fav_id', auth, function(req, res) {
      collection.remove({_id : req.params.fav_id},function(err,favourites){
        if(err) throw err;
        res.json(favourites);
    
      })
    });
  
  module.exports = router;