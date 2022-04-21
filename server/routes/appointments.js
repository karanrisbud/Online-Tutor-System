var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Users');

/* GET home page. */
router.get('/:user_id',function(req, res) {
  collection.find({_id : req.params.user_id},'appointment',function(err,users){
    if(err) throw err;
    res.json(users);

  })
});

/* GET certain appointment. */
/*router.get('/:user_id/:app_id', function(req, res) {
  collection.find({_id : req.params.user_id},'appointment',function(err,users){
    if(err) throw err;
    //console.log('Hey you')
    for(let i = 0; i<users[0].appointment.length; i++){
      if (users[0].appointment[i].appointment_id==req.params.app_id){
        x = users[0].appointment[i]
        break;
      }
    }
    res.json(x);
  })
});*/

router.get('/:user_id/:app_id',function(req, res) 
{
  collection.aggregate([
    {
      $match:{'appointment.appointment_id':req.params.app_id}
    },
  {
    $project:
    {
      appointment:
      {
        $filter:
        {
          input: '$appointment', as: 'appointment', cond:
          {
            $eq:['appointment.appointment_id',req.params.app_id]
          }
        }
      }
    },
    _id:req.params.user_id,function(err,users)
    {
      if(err) throw err;
      res.json(users)
    }
  }
])});

/*POST add new appointment*/
router.post('/:_id',function(req, res) {
  collection.insert({_id : req.params.id},{$push:{'appointment':{
    appointment_id:req.body.appointment_id,
    user_id:req.body.user_id,
    tutor_id:req.body.tutor_id,
    tutor_name:req.body.tutor_name,
    day:req.body.day,
    time:req.body.time
  },function(err,apps){
    if(err) throw err;
    res.json(apps);
  }}})
});

/*PUT update appointment*/

module.exports = router;