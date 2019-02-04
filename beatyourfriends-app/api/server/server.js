/**
* @description sets an express server listening on port 3000
all origins allowed;
sets controller.js as route for requests
initializes db with function initDB fro file config.db
* @author Christina Senger
*/

//File imports
let cfg = require('./config.json');
const db = require('./config.db');
let controller = require('./controller');

//Module imports
let express = require('express');
const app = express();
let cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(express.static('public')); // host public folder
app.use(cors(corsOptions)); // allow all origins -> Access-Control-Allow-Origin: *

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Header Control
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  next();
} );

//routes
app.use('/api', controller);

//testroutes
app.get('/', function(req, res) {
  res.json({message: 'Welcome to module api'});
});
app.get('/loginroutes', function(req, res) {
  res.json({message: 'Welcome to module login post'});
});
app.post('/', function(req, res) {
  res.json({message: 'Welcome to module api post'});
});

//DB initialization
db.initDb.then(() => {
  app.listen(cfg.server.port, () => {
      console.log("Listening on port " + cfg.server.port + "...");
  });
}, () => {console.log("Failed to connect to DB!")}); 
 
module.exports = app;
