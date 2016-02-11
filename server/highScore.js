var mongoose = require('mongoose');

var highScoreSchema = mongoose.Schema({
  highScore: Number,
  playerName: String,
});


module.exports = mongoose.model('highScore', highScoreSchema);


