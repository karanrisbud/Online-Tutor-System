var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection_appointments = db.get('Appointments');
var collection_users = db.get('Users');
var collection_tutors = db.get('Tutors');
const auth = require('./middleware/auth');



router.get('/:user_id', auth, function(req, res) {

  collection_appointments.aggregate( [

       { $match: {user_id : monk.id(req.params.user_id)}},
       {
       $lookup:
          {
             from: "Users",
             localField: "user_id",
             foreignField: "_id",
             as: "Appointments"
           }
        },
        { $project: { "Appointments": 0} }
    
  ],function(err,tutors){
    if(err) throw err;
    res.json(tutors);
  
  })
});


router.get('/:tutor_id/:date/:time', auth, function(req, res) {

  collection_appointments.find({tutor_id : monk.id(req.params.tutor_id),
    date:req.params.date,time : req.params.time},function(err,appointment){
    if(err) throw err;
    res.json(appointment);
  })
});


router.get('/:user_id/:appointment_id', auth, function(req, res) {

  collection_appointments.aggregate( [

       { $match: {user_id : monk.id(req.params.user_id),_id : monk.id(req.params.appointment_id)}},
       {
       $lookup:
          {
             from: "Users",
             localField: "user_id",
             foreignField: "_id",
             as: "Appointments"
           }
        },
    
        { $project: { "Appointments": 0} }
    
  ],function(err,tutors){
    if(err) throw err;
    res.json(tutors);
  
  })
});

router.post('/', auth, function(req, res) {

  var user_id = req.body.user_id;
  
  collection_users.find({_id : monk.id(req.body.user_id)},function(err,user){
    if(err) throw err;
    

    collection_tutors.find({_id : monk.id(req.body.tutor_id)},function(err,tutor){
      if(err) throw err;
      
              collection_appointments.insert({
                user_id : monk.id(user_id),
                user_name : user[0].name,
                tutor_id:monk.id(req.body.tutor_id),
                tutor_name : tutor[0].name,
                subject : tutor[0].subject,
                date:req.body.date,
                time:req.body.time,
  
  
            },function(err,appointments){
              if(err) throw err;
              res.json(appointments);
  
            })
    })
  })

});


router.delete('/:user_id/:appointment_id', auth, function(req, res) {
  collection_appointments.remove({_id : req.params.appointment_id},function(err,tutors){
    if(err) throw err;
    res.json(tutors);
  })
});



  module.exports = router;