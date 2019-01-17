let cfg = require('./config');
const getDb = require('./config.db').getDb;
 
// Fetch all Users
exports.findAll = (req, res) => {
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
};
 
// Find a User by E-Mail
exports.findBId = (req, res) => {
	const _db = getDb();
	let id = req.params.id;
	const query = `
	SELECT *
	FROM users
	WHERE id = ?`;
	_db.query(query, [id], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			res.status(200).json(results);
		}
	});
};
 
// Update a User
exports.update = (req, res) => {
		const _db = getDb();
		let user = req.body;
    let id = req.body.id;
    let firstname = req.body.firstname;
		const query = `
		UPDATE *
		FROM users
		WHERE id = ?`;
		_db.query(query, [id, user], (error, results) => {
			if (error) {
				res.status(400).json({message: "Error"});
			} else {
				res.status(200).json({message: 'Hallo ' + firstname + ' dein Profil wurde upgedated!'});
				alert('Dein Profil wurde upgedated!')
			}
		});	
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	const _db = getDb();
	const id = req.params.id;
	const query = `
	DELETE *
	FROM users
	WHERE id = ?`;
	_db.query(query, [id], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else {
			res.status(200).json({message: 'Dein Profil wurde gelöscht'});
			alert('Dein Profil wurde gelöscht!')
		}
	});
};

// Creates a game for a specific user
exports.createGame = (req, res) => {
	const _db = getDb();
	console.log(req.body);
	console.log(req.params);

	const gametoken = req.body.gametoken;
	const obj = JSON.parse(gametoken);
	const player2id = req.body.player2;
	console.log("player2id: " +player2id);
	console.log(obj.token);
	//console.log(firstname);


	let promise = new Promise(function(resolve, reject){
		const userquery = `
		SELECT t.userid
		FROM tokens t
		WHERE token = ?`;
		_db.query(userquery, [obj.token], (error, results) => {
		if (error) {
			console.log("no user found")
		} else {
			let user1id = results[0].userid;
			console.log("first" + results[0].userid);
			resolve(user1id);
		}
	});

	});
	

	promise.then(function(user1id){
		if(user1id != player2id){
		console.log("second" + user1id);
		const id = req.params.id;
		let qtokens = new Array(5);
		for(let i = 0; i<qtokens.length; i++){
			qtokens[i] = Math.floor(Math.random()*29+1);
		}
		const query = `Insert into games(game_id, player1, player2, fragen) values (?, ?, ?, ?)`;
		_db.query(query, [id, user1id, player2id, JSON.stringify(qtokens)], (error, results) => {
		if(error){
			res.status(400).json({message: "Error"});
			console.log("game db error");
		} else{
			res.status(200).json(req.params.id);
			console.log("game db success");
		}
	})
		}else{
			res.status(400).json({message: "Error"});
		}
	})

	//res.status(200).json(req.params.id);
}

exports.getGame = (req, res) => {
	const _db = getDb();
	console.log(req.params.id);
	let promise = new Promise(function(resolve, reject){
		const userquery = `
		SELECT g.fragen
		FROM games g
		WHERE game_id = ?`;
		_db.query(userquery, [req.params.id], (error, results) => {
		if (error) {
			console.log("no such game found");
		} else {
			let questions = results[0].fragen;
			console.log(questions);
			resolve(questions);
		}
	});

	});

	promise.then(function(questions){
		const query= `SELECT * 
					from fragen 
					where token = ? OR token = ? OR token = ? OR token = ? OR token = ?`;
		questions = questions.substring(1, questions.length-1);
		questionArray = questions.split(",");
		console.log(questionArray[0]);
		console.log(questionArray[4]);
		_db.query(query, [questionArray[0], questionArray[1], questionArray[2], questionArray[3], questionArray[4] ], (error, results) => {
			if(error){
				console.log("error");
			} else{
				console.log(results);
				res.status(200).json(results);
			}

		});

	});

	
}