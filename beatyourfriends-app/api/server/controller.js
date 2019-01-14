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
	console.log(req.params);
	console.log(req.params.id);
	const id = req.params.id;
	res.status(200).json({message: "Received request to generate new game"});
}