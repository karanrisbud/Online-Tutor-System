var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Users');

/* GET home page. */
router.get('/:user_id', function(req, res) {
  collection.find({_id : req.params.user_id},'appointment',function(err,users){
    if(err) throw err;
    res.json(users);

  })
});

router.get('/:user_id/:appointment_id', function(req, res) {
  collection.find({
      '_id': req.params.user_id,
      'appointment' : {
        "appointment_id" : 22
      }
  },'appointment',function(err,users){
    if(err) throw err;
    res.json(users);

  })
});



module.exports = router;