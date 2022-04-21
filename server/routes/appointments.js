var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection_appointments = db.get('Appointments');
var collection_users = db.get('Users');

router.get('/:appointment_id', function(req, res) {
  collection_appointments.find({_id : req.params.appointment_id},function(err,appointments){
    if(err) throw err;
    res.json(appointments);

  })
});

module.exports = router;