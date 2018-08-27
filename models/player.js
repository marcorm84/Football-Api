const mongoose = require('./base');

const Schema = mongoose.Schema;

var playerDataSchema = new Schema({
    name: String,
    position: String,
    shirtNumber: String
  }, {collection: 'playerData'});

var PlayerData = mongoose.model('PlayerData', playerDataSchema);

module.exports = PlayerData;
