const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.users = require('../model/model.js')(sequelize, Sequelize);
 
 
module.exports = db;


let cfg = require('./config.json')
let mysql = require('mysql');

let _db;

let initDb = new Promise((resolve, reject) => {

    // make sure to import 'db_import/galleryDB.sql' into your MySQL database first
    _db = mysql.createConnection({
      host     : cfg.database.host,
      user     : cfg.database.user,
      password : cfg.database.password,
      database : cfg.database.db
    });
    _db.connect((error)=>{
        if (error){
            
            reject();
            
        } else {
        resolve(console.log("Database is connected."));
        }
    });
    
});

function getDb() {
    if (!_db) {
        console.log("Db has not been initialized. Please call init first.");
        return;
    }
    return _db;
}

module.exports = {
    getDb,
    initDb
};
