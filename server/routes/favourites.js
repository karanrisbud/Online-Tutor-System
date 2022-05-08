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
        collection.find({user_id : monk.id(req.params.id)},function(err,favourites){
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

    router.get('/favourited/:user_id/:tutor_id', auth, function(req, res) {
      collection.find({tutor_id : monk.id(req.params.tutor_id),user_id : monk.id(req.params.user_id)},function(err,favourites){
        if(err) throw err;
        if(favourites.length !== 0)
          res.json({"status" : "ok", "result" : true});
        else
        res.json({"status" : "ok", "result" : false});
    
      })
  });
  
    // router.post('/:id', auth, function(req, res) {
    //   collection.insert({
    //       user_name:req.body.user_name,
    //       user_id:req.params.id,
    //       tutor_name:req.body.tutor_name,
    //       tutor_id:req.body.tutor_id,
    //       subject:req.body.subject
    //   },function(err,favourites){
    //     if(err) throw err;
    //     res.json(favourites);
    
    //   })
    // });
  
    router.post('/:user_id', function(req, res) {

      var user_id = req.params.user_id;
      console.log(user_id);
      console.log(req.body.tutor_id)
      
      collection_users.find({_id : monk.id(req.params.user_id)},function(err,user){
        if(err) throw err;
        
    
        collection_tutors.find({_id : monk.id(req.body.tutor_id)},function(err,tutor){
          if(err) throw err;
          
                  collection.insert({
                    user_id : monk.id(user_id),
                    user_name : user[0].name,
                    tutor_id: monk.id(req.body.tutor_id),
                    tutor_name : tutor[0].name,
                    subject : tutor[0].subject
 
      
                },function(err,favourites){
                  if(err) throw err;
                  res.json(favourites);
      
                })
        })
      })
    
    });
    
    
  
    router.delete('/:id', auth, function(req, res) {
      collection.remove({_id : monk.id(req.params.id)},function(err,favourites){
        if(err) throw err;
        res.json(favourites);
    
      })
    });
  
  module.exports = router;