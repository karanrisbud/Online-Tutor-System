var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Tutors');
const auth = require('./middleware/auth');


router.get('/', auth, function(req, res) {
  collection.find({},function(err,tutors){
    if(err) throw err;
    console.log(tutors);
    res.json(tutors);

  })
});

router.get('/:id', auth, function(req, res) {
    collection.find({_id : req.params.id},function(err,tutors){
      if(err) throw err;
      res.json(tutors);
  
    })
  });

  router.get('/:id', auth, function(req, res) {
    collection.find({_id : req.params.id},function(err,tutors){
      if(err) throw err;
      res.json(tutors);
  
    })
  });

  router.post('/', auth, function(req, res) {
    collection.insert({
        name:req.body.name,
        subject:req.body.subject,
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        about_me:req.body.about_me,
        image:req.body.image,
        total_tutoring_hours:req.body.total_tutoring_hours,
        average_ratings:req.body.average_ratings,
        working_hours:req.body.working_hours
    },function(err,tutors){
      if(err) throw err;
      res.json(tutors);
  
    })
  });


  router.put('/:id', auth, function(req, res) {
    collection.update({_id : req.params.id},{$set : {
        name:req.body.name,
        subject:req.body.subject,
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        about_me:req.body.about_me,
        image:req.body.image,
        total_tutoring_hours:req.body.total_tutoring_hours,
        average_ratings:req.body.average_ratings,
        working_hours:req.body.working_hours
    }},function(err,tutors){
      if(err) throw err;
      res.json(tutors);
  
    })
  });

  router.delete('/:id', auth, function(req, res) {
    collection.remove({_id : req.params.id},function(err,tutors){
      if(err) throw err;
      res.json(tutors);
  
    })
  });

module.exports = router;