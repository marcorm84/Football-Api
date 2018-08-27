const mongoose = require('./base');

const Schema = mongoose.Schema;

var teamDataSchema = new Schema({
    id: Number,
    area: {
      id: Number,
      name: String
    },
    shortName: String,
    name: String,
    tla: String,
    address: String,
    phone: String,
    website: String,
    email: String,
    founded: Number,
    clubColors: String,
    venue: String,
    lastUpdated: Date,
    competition_id: Number
  }, {collection: 'teamData'});

  var TeamData = mongoose.model('TeamData', teamDataSchema);

  module.exports = TeamData;
