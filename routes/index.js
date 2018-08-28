const express = require('express');
const router = express.Router();
const ctrls = require('./../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET info of all competitions. */
router.get('/competitions', ctrls.tasks.getCompetitions);

/* GET info of a competition, also save info of players and teams in DB. */
router.get('/competitions/:id', ctrls.tasks.getCompetition);

/* GET info of all teams saved in DB. */
router.get('/team', ctrls.tasks.getTeams);

/* GET info of a team saved in DB. */
router.get('/team/:id', ctrls.tasks.getTeam);

/* GET info of all players saved in DB. */
router.get('/player', ctrls.tasks.getPlayers);

module.exports = router;
