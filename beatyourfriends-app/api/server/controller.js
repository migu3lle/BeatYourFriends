//File imports
let cfg = require('./config');
const getDb = require('./config.db').getDb;
const crypto = require('crypto');
const _db = getDb();

//Express import
const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
const fs = require('fs');

// ----------------> login <--------------------------------//
router.post('/loginroutes', function (req, res)
{
let cfg = require('./config');
const getDb = require('./config.db').getDb;

// --- db query
    let email = req.body.email;
    let pwd = req.body.pass;
    const query = `
    SELECT *
    FROM users u, emails e
    WHERE e.email = ? 
    AND u.password = ?`;
    _db.query(query, [email, pwd], (error, results) => {

		// --- error handling
        if(error){console.log('fehler');
			res.status(400).json({message: "Error"});
        } else if (results.length < 1){console.log('E-Mail oder Passwort falsch');
            res.status(401).json({message: "E-Mail oder Passwort falsch"});
	 
	// --- login
    } else {
    let secret = Math.floor(Math.random() * 1000000000+97);
    let userid = results[0].id;
    let name = results[0].firstname;
    let lastname = results[0].lastname;
	
	// --- authorization
    const token = crypto.createHmac('sha256', userid.toString())
    .update(secret.toString())
    .digest('hex');
console.log(token);
     
    let dbinstert = `
    INSERT INTO tokens(userid, token, expires)
        VALUES  (? , ?, NOW() + INTERVAL 24 HOUR)`;

    let response ={firstname: name, lastname: lastname, token:token, email: email};
    res.status(200).json(response);

    _db.query(dbinstert, [userid, token], (error, results)=> {
    if(error){
        console.log("Error while db insert query.");
    }

});
}
});

});


// --------------------> Profil Functions <------------------//
// Fetch all Users
router.get('/user', function (req, res) {
	const _db = getDb();
	const query = `
	SELECT *
	FROM users`;
	_db.query(query, (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else{
			res.status(200).json(results);
		}
	});
});
 
// Find a User by Mail
router.get('/user/:email', function (req, res) {
	const _db = getDb();
	let email = req.params.email;
	const query = `
	SELECT *
	FROM users u
	WHERE email = ?`;
	_db.query(query, [email], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			res.status(200).json(results);
		}
	});
});
 
// Update a User
router.put('/user', function (req, res) {
	const _db = getDb();
	let user = req.body;
	console.log(user);
	let mail = user.email;
	let firstn = user.firstname;
	let lastn = user.lastname;

		const query = `
		UPDATE users
		SET
		firstname = ?,
		lastname = ?,
		email = ?
		WHERE email = ?`;
		_db.query(query, [firstn, lastn, mail, mail], (error, results) => {
			if (error) {
				res.status(400).json({message: "Error"});
			} else {
				res.status(200).json({message: 'Hallo ' + firstn + ' dein Profil wurde upgedated!'});
				console.log('Dein Profil wurde upgedated!')
				console.log(user);
			}
		});	
});
 
// Delete a User by Mail
router.delete('/user/:email', function (req, res) {
	const _db = getDb();
	const email = req.params.email;
	console.log(email);

	const query = `
	DELETE FROM users
	WHERE email = ?`;
	_db.query(query, [email], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			res.status(200).json({message: 'Dein Profil wurde gelöscht'});
			console.log('Dein Profil wurde gelöscht!')
		}
	});
});


//------------------------> Password Reset <------------------//
//check if email exists for a user in a db
router.get('/reset/:email', function (req, res) {
	const _db = getDb();
	const email = req.params.email;
	console.log(email);

	const query = `
	SELECT *
	FROM users u
	WHERE email = ?`;
	_db.query(query, [email], (error, data) => {
		if (error) {
			res.status(400).json({message: "Es gibt keinen User mit dieser Mailadresse."});
		} else {
			res.status(200).json(data);

			//create token
			let secret = Math.floor(Math.random() * 1000000000+97);
			console.log(data[0].id);
			let userid =data[0].id;

			const token = crypto.createHmac('sha256', userid.toString())
			.update(secret.toString())
			.digest('hex');
			console.log(token);

			//store token in db
			let dbinstert = `
			INSERT INTO tokens(userid, passtoken, expires)
				VALUES  (? , ?, NOW() + INTERVAL 24 HOUR)`;

				_db.query(dbinstert, [userid, token], (error, results)=> {
					if(error){
						console.log("Error while db insert query.");
					}
				});

			//send E-Mail

			// --- set my E-Mail as Sender and create transport
			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					   user: 'chrisi.senger@gmail.com',
					   pass: 'Nanga Parbat 8125'
				   }
			   });

			   // --- set options
			   const mailOptions = {
				from: 'chrisi.senger@gmail.com',
				to: email, // list of receivers
				subject: 'Beat your Friends Passwort Reset',
				text: 'Sie haben einen Passwort Reset angefordet.' +
					'Klicken Sie auf folgenden Link, um ihr Passwort zu ändern:' +
					'http://localhost:4200/pwchange/' + token + '\n\n' +
					'Sollten Sie kein Passwort beantragt haben, betrachten Sie diese E-Mail als gegenstandslos.'
			  };

			  // --- send Mail
			  transporter.sendMail(mailOptions, function (err, info) {
				if(err)
				  console.log(err)
				else
				  console.log(info);
				  res.status(200).json({message: 'Eine Mail wurde an die angegebene E-Mail Adresse gesendet.'})
			 });
		}
	});
});

//check if user can reset password
router.get('/res/:token', function (req,res ) {
	const resettoken = req.params.token;
	const _db = getDb();
	console.log(resettoken);

	//check if passtoken exists and is still valid
	const query = `
	SELECT expires
	FROM tokens
	WHERE passtoken = ?`;
	_db.query(query, [resettoken], (error, results) => {
		if (error) {
			res.status(400).json({message: "Der Reset Token ist nicht gültig."});
		} 
		
			//show Site
			else {
				res.status(200).json(true);
			}
	});
});

//update Password
router.put('/change', function (req, res) {
	const _db = getDb();
	const pass = req.body.password;
	const email = req.body.email;
	console.log(pass);

	//db query
	const query = `
	UPDATE users
		SET
		password = ?
		WHERE email = ?`;
	_db.query(query, [pass, email], (error, results) => {
		if (error) {
			res.status(400).json({message: "Der Reset Token ist nicht gültig."});
		} else {
			res.status(200).json({message: 'Dein Passwort wurde upgedated!'})
		}
	});
});

// -----------------> Get Points <-------------------//

//get points from db
router.get('/stat/:email', function (req, res) {
	const _db = getDb();
	let email = req.params.email;
	const query = `
	SELECT won, equal, loose
	FROM emails e
	WHERE email = ?`;
	_db.query(query, [email], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			res.status(200).json(results);
		}
	});
});

module.exports = router;
