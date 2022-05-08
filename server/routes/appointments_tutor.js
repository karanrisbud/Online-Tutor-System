var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection_appointments = db.get('Appointments');
var collection_users = db.get('Users');
var collection_tutors = db.get('Tutors');
const auth = require('./middleware/auth');



router.get('/:tutor_id', auth, function(req, res) {

  collection_appointments.aggregate( [

       { $match: {tutor_id : monk.id(req.params.tutor_id)}},
       {
       $lookup:
          {
             from: "Tutors",
             localField: "tutor_id",
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

router.get('/:tutor_id/:appointment_id', auth, function(req, res) {

  collection_appointments.aggregate( [

       { $match: {tutor_id : monk.id(req.params.tutor_id),_id : monk.id(req.params.appointment_id)}},
       {
       $lookup:
          {
             from: "Tutors",
             localField: "tutor_id",
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

  module.exports = router;