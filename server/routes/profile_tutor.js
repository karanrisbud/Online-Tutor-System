var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Tutors');
const auth = require('./middleware/auth');
var fileUpload = require('express-fileupload');
router.use(fileUpload());
const fs = require('fs');

router.get('/:id', auth, function(req, res) {
    collection.find({_id : monk.id(req.params.id)},function(err,users){
        if(err) throw err;
        res.json(users);
    })
});

router.put('/:id', auth, function(req, res) {
    collection.update({_id : monk.id(req.params.id)},{$set : {
      subject:req.body.subject,
      username:req.body.username,
      name:req.body.name,
      about_me:req.body.about_me
      //image:req.body.image
    }},function(err,favourites){
      if(err) throw err;
      res.json(favourites);
  
    })
  });

  router.post('/image/:id', function(req, res) {

    const tutor_id = req.params.id;


        if(req.files === null){
          res.send("File empty");
        }
        
        else{
  
        const file = req.files.File;
        console.log(file);



        file.mv(`${__dirname}/../../client/public/assets/tutor_images/${file.name}`,err => {
          if(err){
            console.log(err);
            res.send(err);
          }
          else{
          fs.rename(`${__dirname}/../../client/public/assets/tutor_images/${file.name}`,
          `${__dirname}/../../client/public/assets/tutor_images/${tutor_id}.jpg`,() =>{
            console.log("File renamed");
          })
          collection.update({_id : monk.id(req.params.id)},{$set : {
            image:tutor_id+'.jpg'
          }},function(err,tutor){
            if(err) throw err;
            
          })

          res.json({fileName : file.name ,filePath : `/tutor_images/${file.name}`})
          }
          
        })
      }
  

  });

  module.exports = router;