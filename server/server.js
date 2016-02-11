var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var highScore = require('./highScore');


var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));


// mongoose.connect('mongodb://localhost/weather');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//  console.log('Mongodb connection open');
// });



// app.post('/', function (req, res) {
//   console.log(req.body);
//   // { highScore: '31.59', playerName: 'bob' }
//   var score = new highScore(req.body);
//   score.save(function(err) { if (err) { console.log('err', err); } });
// });

// app.get('/scores', function (req, res) {
//   highScore.find({}, function(err, scores) {
//     res.status(200).send(scores);
//   });
// });



console.log("WeatherGameApp is listening on 8080");
app.listen(process.env.PORT || 8080);





