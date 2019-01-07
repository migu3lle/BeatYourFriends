exports.login = function (req, res)
{
let cfg = require('./config');
const getDb = require('./config.db').getDb;
const crypto = require('crypto');

    console.log('req');
    const _db = getDb();
    let email = req.body.email;
    let pwd = req.body.pass;
    const query = `
    SELECT u.id, u.firstname, u.lastname
    FROM users u, emails e
    WHERE u.id = e.userid 
    AND e.email = ? 
    AND u.password = ?`;
    _db.query(query, [email, pwd], (error, results) => {
    
        if(error){console.log('fehler');
            res.status(400).json({message: "Error"});
        } else if (results.length < 1){console.log('falsch');
            res.status(401).json({message: "E-Mail oder Passwort falsch"});
        
    } else {
    let secret = Math.floor(Math.random() * 1000000000+97);
    let userid = results[0].id;
    let name = results[0].firstname;
    let lastname = results[0].lastname;
    console.log(result[0]);
    
    const token = crypto.createHmac('sha256', userid.toString())
    .update(secret.toString())
    .digest('hex');
console.log(token);
   
       
    let dbinstert = `
    INSERT INTO tokens(userid, token)
        VALUES  (? , ?)`;

    

    let response ={firstname: name, lastname: lastname, token:token};
    res.status(200).json(response);
    
    db.query(dbinstert, [userid, token], (error, results)=> {
    if(error){
        console.log("Error while db insert query.");
    }
    

});
}
});

};