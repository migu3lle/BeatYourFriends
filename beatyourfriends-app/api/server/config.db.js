/**
* @description inits database with data from config.json
* @author Christina Senger
*/
let cfg = require('./config.json')
let mysql = require('mysql');

let _db;

let initDb = new Promise((resolve, reject) => {

    _db = mysql.createConnection({
      host     : cfg.database.host,
      user     : cfg.database.user,
      password : cfg.database.password,
      database : cfg.database.db
    });
    _db.connect((error)=> {
        if (error){
              reject();  
        } else {
            resolve(console.log("Database is connected."));
            } 
    }) 
});

function getDb() {
    if (!_db) {
        console.log("Db has not been initialized.");
        return;
    } else {return _db;}
}

module.exports = {
    getDb,
    initDb
};
