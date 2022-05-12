var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Users');
const auth = require('./middleware/auth');
var fileUpload = require('express-fileupload');
router.use(fileUpload());
const fs = require('fs');

router.get('/:id', auth, function(req, res) {
    collection.find({_id : req.params.id},function(err,users){
        if(err) throw err;
        res.json(users);
    })
});

router.put('/:id', auth, function(req, res) {
    collection.update({_id : req.params.id},{$set : {
      mobile_no:req.body.mobile_no,
      name:req.body.name,
      username:req.body.username,
      image:req.body.image
    }},function(err,profile){
      if(err) throw err;
      res.json(profile);
  
    })
  });

  router.post('/image/:id', function(req, res) {

    const user_id = req.params.id;


        if(req.files === null){
          res.send("File empty");
        }
        
        else{
  
        const file = req.files.File;
    
        file.mv(`${__dirname}/../../client/public/assets/user_images/${file.name}`,err => {
          if(err){
            console.log(err);
            res.send(err);
          }
          else{
          fs.rename(`${__dirname}/../../client/public/assets/user_images/${file.name}`,
          `${__dirname}/../../client/public/assets/user_images/${user_id}.jpg`,() =>{
            console.log("File renamed");
          })
          collection.update({_id : monk.id(req.params.id)},{$set : {
            image:user_id+'.jpg'
          }},function(err,tutor){
            if(err) throw err;
            
          })

          res.json({fileName : file.name ,filePath : `/user_images/${file.name}`})
          }
          
        })
      }
  

  });


  module.exports = router;