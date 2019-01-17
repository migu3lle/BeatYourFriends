let cfg = require('./config');
let express = require('express');
let login = require('./login');
let controller = require('./controller');
let cors = require('cors');
const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(express.static('public')); // host public folder
app.use(cors(corsOptions)); // allow all origins -> Access-Control-Allow-Origin: *
const db = require('./config.db');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/*var mysql = require('mysql');
var session = require('express-session');
var path = require('path');*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

var router = express.Router();
router.get('/', function(req, res) {
  res.json({message: 'Welcome to module api'});
});
app.use('', router);


router.post('/login/:email', login.login);
app.use('login', router);

router.get('/users', controller.findAll);
app.use('users', router);
router.get('/users/:id', controller.findBId);
app.use('users', router);
router.put('/users/:id', controller.update);
app.use('users', router);
router.delete('/users/:id', controller.delete);
app.use('users', router);

//Used for creating a new game for specific user
router.put('/game/:id', controller.createGame);
app.use('game', router);

router.get('/game/:id', controller.getGame);

/*app.route('/users').get('/users', controller.findAll);
app.route('/users/:id').get('/users/:userId', controller.findBId);
app.route('/users/:id').put('/users', controller.update);
app.route('/users/:id').delete('/users/:userId', controller.delete);*/


db.initDb.then(() => {
  app.listen(cfg.server.port, () => {
      console.log("Listening on port " + cfg.server.port + "...");
  });
}, () => {console.log("Failed to connect to DB!")}); 



  
 /*force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});*/
 
