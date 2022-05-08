var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var passwordValidator = require('password-validator');

const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');


var monk = require('monk');
const { response } = require('express');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection_user = db.get('Users');
var collection_tutor = db.get('Tutors');




router.get('/', function(req, res) {
	res.render('index', { title: 'Express'} );

});

//protected route
router.get('/welcome', auth, function(req, res) {

	res.json({ status : "ok",message: "Welcome!!" } );
});


router.post('/userregister', function(req, res) {
	
	let {username,name,mobile_no,email,password } = req.body;

	if(!(username && name && mobile_no && email && password)){

		res.json( {status:"error" ,message: "Please fill all the fields!" } );

	}
  var schema = new passwordValidator();
  schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();

  if(!schema.validate(password)){

    res.json( { status : "error" ,message: "Weak Password!!" } );

  }

	else{

		collection_user.findOne({ email: email }, function(err, user){
			if (err) throw err;

			if (user){
				res.json({status : "error" , message : "User already exists. Please login!"} );

			}
			else{
        password = bcrypt.hashSync(password, 5);
				let newUser = {
					username,
          name,
          mobile_no,
					email,
					password

				}
				collection_user.insert(newUser, function(err, user){
					
          if (err) throw err;
					var token = jwt.sign({ user_id: user._id, email}, 'secretkey');

					if (token){
						user.token = token;

					 }
					res.json({status : "ok"});

				})


			}


		});	

	}



});

router.post('/userlogin', function(req, res) {
	const {email, password } = req.body;

	if(!(email && password)){

		res.json({ status : "error" , message: "Please fill all the fields!" } );
	}
	else{

		collection_user.findOne({ email: email }, function(err, user){
			if (err) throw err;
			if(user == null){

				res.json({ status : "error" , message: "User doesn't exist" } );

			}
			else{
        const result = bcrypt.compareSync(password,user.password);

				if (result){
					var token = jwt.sign({ user_id: user._id, email}, 'secretkey');
					user.token = token;
					res.send(user);

				}
				else{
					res.json( {status : "error" , message: "User email or password is incorrect!" } );

				}

			}

		});

	}

});



router.post('/tutorregister', function(req, res) {
	
	let {username,name,mobile_no,email,password,subject,about_me,image,total_tutoring_hours,average_ratings} = req.body;

	if(!(username && name && mobile_no && email && password && about_me && subject)){

		res.json( {status:"error" ,message: "Please fill all the fields!" } );

	}
  var schema = new passwordValidator();
  schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();

  if(!schema.validate(password)){

    res.json( { status : "error" ,message: "Weak Password!!" } );

  }

	else{

		collection_tutor.findOne({ email: email }, function(err, tutor){
			if (err) throw err;

			if (tutor){
				res.json({status : "error" , message : "Tutor already exists. Please login!"} );

			}
			else{
        password = bcrypt.hashSync(password, 5);
				let newUser = {
					username,
          			name,
          			mobile_no,
					email,
					password,
					subject,
					about_me,
					image,
					total_tutoring_hours,
					average_ratings

				}
				collection_tutor.insert(newUser, function(err, tutor){
					
          if (err) throw err;
					var token = jwt.sign({ tutor_id: tutor._id, email}, 'secretkey');

					if (token){
						tutor.token = token;

					 }
					res.json({status : "ok"});

				})


			}


		});	

	}



});


router.post('/tutorlogin', function(req, res) {
	const {email, password } = req.body;

	if(!(email && password)){

		res.json({ status : "error" , message: "Please fill all the fields!" } );
	}
	else{

		collection_tutor.findOne({ email: email }, function(err, tutor){
			if (err) throw err;
			if(tutor == null){

				res.json({ status : "error" , message: "Tutor doesn't exist" } );

			}
			else{
        const result = bcrypt.compareSync(password,tutor.password);

				if (result){
					var token = jwt.sign({ tutor_id: tutor._id, email}, 'secretkey');
					tutor.token = token;
					res.send(tutor);

				}
				else{
					res.json( {status : "error" , message: "Tutor email or password is incorrect!" } );

				}

			}

		});

	}

});







module.exports = router;
