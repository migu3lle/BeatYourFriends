//File imports
const getDb = require('./config.db').getDb;
const crypto = require('crypto');
const _db = getDb();

//Express import
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');



// ----------------> login <--------------------------------//

router.post('/loginroutes', function (req, res) {
// --- db query
    let email = req.body.email;
    let pwd = req.body.pass;
    let query = `
    SELECT *
    FROM users
    WHERE email = ? 
    AND password = ?`;
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
    let token = crypto.createHmac('sha256', userid.toString())
    .update(secret.toString())
    .digest('hex');
console.log(token);
     
    let dbinstert = `
    INSERT INTO tokens(userid, token, passtoken, expires)
        VALUES  (? , ?, "12345",  NOW() + INTERVAL 24 HOUR)`;

    let response ={firstname: name, lastname: lastname, token:token, email: email};
    res.status(200).json(response);

    _db.query(dbinstert, [userid, token], (error, results)=> {
    if(error){
        console.log("Error while db insert query. test");
    }

});
}
});

});



// --------------------> Profil Functions <------------------//

// Fetch all Users
router.get('/user', function (req, res) {
	let query = `
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


// Find a Mail by Id
router.post('/user/:id', function (req, res) {
	let id = req.params.id;
	console.log('ID: ' + id);
	let query = `
	SELECT email
	FROM users u
	WHERE id = ?`;
	console.log(id);
	_db.query(query, [id], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			console.log(results[0]);
			res.status(200).json(results);
		}
	});
});

 
// Update a User
router.put('/user', function (req, res) {
	let user = req.body;
	console.log(user);
	let mail = user.email;
	let firstn = user.firstname;
	let lastn = user.lastname;

		let query = `
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
	let email = req.params.email;
	console.log(email);

	let query = `
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
	let email = req.params.email;
	console.log(email);

	let query = `
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

			let token = crypto.createHmac('sha256', userid.toString())
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
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					   user: 'chrisi.senger@gmail.com',
					   pass: 'Nanga Parbat 8125'
				   }
			   });

			   // --- set options
			   let mailOptions = {
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
	let resettoken = req.params.token;
	console.log(resettoken);

	//check if passtoken exists and is still valid
	let query = `
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
	let pass = req.body.password;
	let email = req.body.email;
	console.log(pass);

	//db query
	let query = `
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
	let email = req.params.email;
	let query = `
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



// ------------------> Game <-------------------//

//get player 2s game status
router.get('/players/:gameid', function (req, res) {
		let gameId = req.params.gameid;
		console.log(gameId);
		let query = `
		SELECT player2status
		FROM game
		WHERE game_id = ?`;
		_db.query(query, [gameId], (error, results) => {
			if (error) {
				res.status(400).json({message: "Error"});
			} else {
				res.status(200).json(results);
			}
		});
});


//get player 1s game status
router.get('/player/:gameid', function (req, res) {
	let gameId = req.params.gameid;
	console.log(gameId);
	let query = `
	SELECT player1status
	FROM game
	WHERE game_id = ?`;
	_db.query(query, [gameId], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			res.status(200).json(results);
		}
	});
});


//update game status
router.put('/player/:gameid', function (req, res) {
	let gameId = req.body.gameid;
	console.log("gameID is: " + gameId);
	let query1 = `UPDATE game g
	SET g.player1status = CASE
	WHEN g.player1status = 0 THEN 1
	WHEN g.player1status = 1 THEN 0
	END
	WHERE g.game_id = ?;
	`;


	let query2 = `UPDATE game g
	SET g.player2status = CASE
	WHEN g.player2status = 0 THEN 1
	WHEN g.player2status = 1 THEN 0
	END
	WHERE g.game_id = ?;`;
	_db.query(query1, [gameId], (error, results) => {
		if (error) {
			console.log("error while updating game status"+ error);
			res.status(400).json({message: "Error"});
		} else {
			console.log("success while updating game status");
			_db.query(query2, [gameId], (error, results) =>{
				if(error){

				}else{
					console.log("updated both players successfully");
					res.status(200).json({message: "Updated"});
					
				}
			})
			
		}
	});
});


//get Questions from db
router.post('/question/:counter', function (req, res) {
	const counter = req.params.counter;
	let gamesid = req.body.gameid;
	let obj = JSON.parse(req.body.game);
	gamesid = obj;
	console.log(obj);
	console.log(req.body);
	console.log("Question "+ counter + " requested");
	console.log("from game "+ gamesid);

	//check if table is empty
	let testquery =`
	SELECT token
	FROM playquest
	WHERE counter = ? AND id = ?`;
	_db.query(testquery, [counter, gamesid], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {

			//if there are no stored questions select questions from fragen
			if (results[0] === undefined) {
				console.log('No results');
				let query = `
				SELECT Frage, Antwort1, Antwort2, Antwort3, token
				FROM fragen
				ORDER BY RAND()
				LIMIT 1`;
				_db.query(query, (error, result) => {
					if (error) {
						console.log("error selecting question");
						res.status(400).json({message: "Error"});
					} else {
						
						//store to question in playquest table
						//so that player2 get same questions
						console.log('Res2: ' + result[0]);
						let Frage = result[0].Frage;
						let Antwort1 = result[0].Antwort1;
						let Antwort2 = result[0].Antwort2;
						let Antwort3 = result[0].Antwort3;
						let fragetoken = result[0].token;

						let dbinsertt = `
						INSERT INTO playquest(id, counter, token, Frage, Antwort1, Antwort2, Antwort3)
						VALUES  (? , ? , ? , ? , ? , ? , ?)`;
						_db.query(dbinsertt, [gamesid, counter, fragetoken, Frage, Antwort1, Antwort2, Antwort3], (error, results) => {
							if (error) {
								console.log('error doing insert');
								res.status(400).json({message: "Error"});
							} else {res.status(200).json(result);
								console.log("successful insertion into playquest "+ result);
							}
						});

					//res.status(200).json(result);
					console.log(result);
				};
			})
		} else {
				//if there are questions in playquest send those to user
				let savequery =`
				SELECT Frage, Antwort1, Antwort2, Antwort3, token
				FROM playquest
				WHERE counter = ?
				AND id = ?`;
				_db.query(savequery, [counter, gamesid], (error, data) => {
					if (error) {
						res.status(400).json({message: "Error"});
					} else {
						res.status(200).json(data);
						console.log(data);
						//delete question from questid
						let deletequery =`
						DELETE FROM playquest
						WHERE id = ? AND counter = ?`;
						_db.query(deletequery, [gamesid, counter], (error, dat) => {
							if (error) {
								//res.status(400).json({message: "Error"});
							} else {
								//res.status(200).json({message: 'Dein Profil wurde gelöscht'});
								console.log('Frage gelöscht')
							}
						});
					}
				});
			};
		};
	});
});


//get Answer from db
router.get('/answer/:token', function (req, res) {
	let token = req.params.token;
	let query = `
	SELECT Richtig
	FROM fragen
	WHERE token = ?`;
	_db.query(query,[token], (error, results) => {
		if (error) {
			console.log("get correct answer error");
			res.status(400).json({message: "Error"});
		} else {
			console.log('Result: ' + results);
			res.status(200).json(results);
		}
	});
});


//increment points from user1
router.get('/point/:gameid', function (req, res) {
	console.log("incrementing points from player 1");
	let gameId = req.params.gameid;
	let query = `
	UPDATE game
	SET player1points = player1points + 1
	WHERE game_id = ?`;
	_db.query(query, [gameId], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
			console.log("error while updating points");
		} else {
			res.status(200).json(results);
			console.log("sucess while updating points");
		}
	});
});


//increment points from user2
router.get('/points/:gameid', function (req, res) {
	console.log("incrementing points from player 2");
	let gameId = req.params.gameid;
	let query = `
	UPDATE game
	SET player2points = player2points + 1
	WHERE game_id = ?`;
	_db.query(query, [gameId], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
			console.log("error while updating points");
		} else {
			res.status(200).json(results);
			console.log("sucess while updating points");
		}
	});
});


//get winner
router.post('/winner', function (req, res) {
	let gameId = req.body.gameid;
	let query = `
	SELECT player1points, player2points, player1, player2
	FROM game
	WHERE game_id = ?`;
	_db.query(query, [gameId], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			res.status(200).json(results);
		}
	});
});


//set player1 as winner
router.put('/won', function (req, res) {
	let email1 = req.body.email1;
	let email2 = req.body.email2;
	let query = `
	UPDATE emails
	SET 
	won = won + 1
	WHERE = email = ?
	SET loose = loose + 1
	WHERE email = ?`;
	_db.query(query, [email1, email2], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			res.status(200).json(results);
		}
	});
});


//set equal
router.put('/equal', function (req, res) {
	let email1 = req.body.email1;
	let email2 = req.body.email2;
	let query = `
	UPDATE emails
	SET 
	equal = equal + 1
	WHERE = email = ?
	SET equal = equal + 1
	WHERE email = ?`;
	_db.query(query, [email1, email2], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			res.status(200).json(results);
		}
	});
});


//set player2 as winner
router.put('/loose', function (req, res) {
	let email1 = req.body.email1;
	let email2 = req.body.email2;
	let query = `
	UPDATE emails
	SET 
	loose =loose + 1
	WHERE = email = ?
	SET won = won + 1
	WHERE email = ?`;
	_db.query(query, [email1, email2], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			res.status(200).json(results);
		}
	});
});


//check if game already exists
router.post('/play', function (req, res) {
let user1 = req.body.user1;
let gametoken = req.body.gametoken;
let obj = JSON.parse(gametoken);

let promise = new Promise(function(resolve, reject){
	//select my userid
	let userquery = `
	SELECT userid
	FROM tokens t
	WHERE token = ?`;
	_db.query(userquery, [obj.token], (error, results) => {
	if (error) {
		console.log("no user found")
	} else {
		let user2id = results[0].userid;
		console.log("first" + results[0].userid);
		resolve(user2id);
	}
});
});

//check if player1 and player 2 are not the same
promise.then(function(user2id){
if(user2id != user1){
	console.log("second" + user2id);

//select game_id from table
let query = `
SELECT game_id, player1
FROM game
WHERE player1 = ?
AND player2 = ?`;
_db.query(query, [user1, user2id], (error, result) => {
if (error) {
			res.status(400).json({message: "Error"});
			console.log("game db error");
		} else{
			res.status(200).json(result);
			console.log("game db success");
		}
	})
		} else{
			res.status(400).json({message: "Error"});
		}
	})
});


//store gameId in db and set player status
router.put('/play/:gameid', function (req, res) {
	console.log(req.body);
	console.log(req.params);
	var gamingid = req.params.gameid;

	let gametoken = req.body.gametoken;
	let obj = JSON.parse(gametoken);
	let player2id = req.body.player2;
	console.log("player2id: " +player2id);
	console.log(obj.token);


	let promise = new Promise(function(resolve, reject){
		//check if user exists
		let userquery = `
		SELECT userid
		FROM tokens
		WHERE token = ?`;
		_db.query(userquery, [obj.token], (error, results) => {
			console.log('results: ' + JSON.stringify(results))
		if (error) {
			console.log("no user found")
		} else {
			let user1id = results[0].userid;
			console.log("first" + results[0].userid);
			resolve(user1id);
		}
	});

	});
	
	//check if player1 and player 2 are not the same
	promise.then(function(user1id){
		if(user1id != player2id){
		console.log("second" + user1id);

		//insert values into games
		let insertquery = `
		INSERT INTO game(game_id, player1, player2, player1status, player2status, player1points, player2points, round)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
		_db.query(insertquery, [gamingid, user1id, player2id, 1, 0, 0, 0, 1], (error, results) => {
		if(error){
			console.log(gamingid);
			res.status(400).json({message: "Error"});
			console.log("game db error");
		} else{
			res.status(200).json(user1id);
			console.log("game db success");
		}
	})
		} else{
			res.status(400).json({message: "Error"});
		}
	})

	//res.status(200).json(req.params.id);
});

router.get('/games/:email', function(req, res){
	console.log(req.params.email);
	let email = req.params.email;

	let promise = new Promise(function(resolve, reject){
		//select my userid
		let userquery = `SELECT userid 
		FROM emails WHERE email = ?;`;
		_db.query(userquery, [email], (error, results) => {
		if (error) {
			console.log("no user found")
			res.status(400).json({message: "ERROR"});
		} else {
			let userid = results[0].userid;
			resolve(userid);
		}
	});
	});
	
	promise.then(function(userid){
		let query = `SELECT * FROM game WHERE player1 = ? or player2 = ?;`;
		_db.query(query, [userid, userid], (error, results) => {
			if(error){
				res.status(400).json({message: "ERROR"});
			}else{
				res.status(200).json(results);
			}
		})
	});




});

router.get('/userid/:email', function(req, res){
	let email = req.params.email;
	let userquery = `SELECT userid 
	FROM emails WHERE email = ?;`;
	_db.query(userquery, [email], (error, results) => {
	if (error) {
		console.log("no user found")
		res.status(400).json({message: "ERROR"});
	} else {
		let userid = results[0].userid;
		res.status(200).json(userid);
	}
});

});


router.put('/updateRound/:gameid', function(req, res){
	let gameId = req.body.gameid;
	console.log(gameId + " requests a round change!");
	let query =`
	UPDATE game
	SET 
	round = round + 1
	WHERE game_id = ?`;
	_db.query(query, [gameId], (error, results) => {
		if(error){
			console.log("round errror");
			res.status(400).json();
		}else{
			res.status(200).json();
			console.log("round success");
		}
	});

});

/**
    * Takes a newsletter subscription object and stores into the database
	* @author Michael Gundacker
*/
router.post('/notifications', function(req, res){
	let subscription = req.body.subscription;
	let userToken = req.body.userToken;
	console.log('received /notifications for user: ' + req.body.userToken)
	let insertquery = `
		INSERT INTO subscriptions(userid, subscription)
		VALUES (?, ?)`;
		_db.query(insertquery, [subscription, userToken], (error, results) => {
		if(error){
			res.status(400).json({message: "DB Error"});
			console.log("notification insert db error");
		} else{
			res.status(200).json('Subscription inserted successfully');
			console.log("insert subscription success success");
		}
	})
})

module.exports = router;
