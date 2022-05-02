var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var passwordValidator = require('password-validator');

const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');


var monk = require('monk');
const { response } = require('express');
var db = monk("mongodb+srv://karanrisbud:wplproject39@cluster0.syl2z.mongodb.net/WPL?retryWrites=true&w=majority");
var collection = db.get('Users');



router.get('/', function(req, res) {
	res.render('index', { title: 'Express'} );

});

//protected route
router.get('/welcome', auth, function(req, res) {

	res.json({ message: "Welcome!!" } );
});


router.post('/userregister', function(req, res) {
	
	let {username,name,mobile_no,email,password } = req.body;

	if(!(username && name && mobile_no && email && password)){

		res.json( { error: "All fields are required!" } );

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

    res.json( { error: "Weak Password!!" } );

  }

	else{

		collection.findOne({ email: email }, function(err, user){
			if (err) throw err;

			if (user){
				res.json({ error : "User already exists. Please login!"} );

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
				collection.insert(newUser, function(err, user){
					
          if (err) throw err;
					var token = jwt.sign({ user_id: user._id, email}, 'secretkey');

					if (token){
						user.token = token;

					 }
					res.json(user);

				})


			}


		});	

	}



});

router.post('/userlogin', function(req, res) {
	const {email, password } = req.body;

	if(!(email && password)){

		res.json({ error: "All fields are required!" } );
	}
	else{

		collection.findOne({ email: email }, function(err, user){
			if (err) throw err;
			if(user == null){

				res.json({ error: "User doesn't exist" } );

			}
			else{
        const result = bcrypt.compareSync(password,user.password);

				if (result){
					var token = jwt.sign({ user_id: user._id, email}, 'secretkey');
					user.token = token;
					res.send(user);

				}
				else{
					res.json( {error: "User email or password is incorrect!" } );

				}

			}

		});

	}

});
module.exports = router;
