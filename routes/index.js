const express = require('express');
const router = express.Router();
const ctrls = require('./../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET info of all competitions. */
router.get('/competitions', (req, res, next) => {
  ctrls.tasks.getCompetitions().then( result => {
    res.status(200).json({
      data: result
    });
  });
});

/* GET info of a competition, also save info of players and teams in DB. */
router.get('/competitions/:id', (req, res, next) => {
  ctrls.tasks.getCompetition(req.params.id).then( result => {
    res.status(200).json({
      data: result
    });
  });
});

/* GET info of all teams saved in DB. */
router.get('/team', (req, res, next) => {
  ctrls.tasks.getTeams().then( result => {
    res.status(200).json({
      data: result
    });
  });
});

/* GET info of a team saved in DB. */
router.get('/team/:id', (req, res, next) => {
  ctrls.tasks.getTeam(req.params.id).then( result => {
    res.status(200).json({
      data: result
    });
  });
});

/* GET info of all players saved in DB. */
router.get('/player', (req, res, next) => {
  ctrls.tasks.getPlayers().then( result => {
    res.status(200).json({
      data: result
    });
  });
});

module.exports = router;
