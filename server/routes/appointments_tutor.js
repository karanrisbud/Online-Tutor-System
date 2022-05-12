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

  var today = new Date(new Date().setDate(new Date().getDate()));
  var dd_min = today.getDate();
  var mm_min = today.getMonth() + 1;
  var yyyy_min = today.getFullYear();


  if (dd_min < 10) {
    dd_min = '0' + dd_min
}

if (mm_min < 10) {
    mm_min = '0' + mm_min
}
today = yyyy_min + '-' + mm_min + '-' + dd_min;

collection_appointments.find({tutor_id : monk.id(req.params.tutor_id),
date : {$gte: today}},{sort: {date: 1}}
,function(err,appointment){
  if(err) throw err;
  res.json(appointment);
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