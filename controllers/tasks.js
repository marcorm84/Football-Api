const _ = require('lodash');
const http = require('http');
const PlayerData = require('./../models/player');
const TeamData = require('./../models/team');
const axios = require('axios');

const MAX_REQUEST = 13; //Set a max number of request per minute

const instance = axios.create({
  baseURL: 'http://api.football-data.org',
  headers: { 'X-Auth-Token' : 'b2ca818923c041b2af26ce8a132700d5'}
});

function getApi(path, res = 0) {
  return instance.get(path)
  .then(function (response) {
    console.log('success api call' );
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response);
    return 'error in request!';
  });
  return {};
}

//Wait a minute
function sleep() {
  console.log('Taking a break...');
  const promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, 60000);
  });

  return promise;
}

//Get and save data from players
function getPlayerData(pathPlayers) {
    getApi(pathPlayers).then( result => {
      const squad = result.squad;
      if (squad) {
        result.squad.map((player) => {
          const item = {
            name: player.name,
            position: player.position,
          };
          const playerData = new PlayerData(item);
          playerData.save();
        });
      };
    })
    .catch(function (error) {
      console.log(error.response);
    });
}
//Save data from teams
async function getTeamData(teamResult, id) {
  const teams = teamResult.teams;
  let reqs = 0;
  if(teams) {
    for (let i = 0; i < teams.length; i++) {
      const pathPlayers = `/v2/teams/${teams[i].id}`;
      teams[i]['competition_id'] = id;
      const teamData = new TeamData(teams[i]);
      teamData.save();
      //Avoid to reach max number of request per minute in API
      if (reqs < MAX_REQUEST) {
        getPlayerData(pathPlayers);
        reqs++;
      }
      else {
        reqs = 0;
        await sleep();
      }
    }
  }
}

const tasksCtrl = {
  getCompetitions:function(req, res, next) {
    const path = '/v2/competitions';

    return getApi(path).then(result => {
      return res.status(200).send({result});
    });
  },
  getCompetition: function(req, res, next) {
    const id = req.params.id;
    const pathCompetitions = `/v2/competitions/${id}`;
    const pathTeams = `/v2/competitions/${id}/teams`;

    TeamData.find({competition_id: id})
      .then(function(doc) {
        if (doc.length == 0) {
          getApi(pathTeams).then( teamResult => {
            getTeamData(teamResult, id);
          })
          .catch(function (error) {
            console.log(error.response);
            return error;
          });
        }
      });

    return (getApi(pathCompetitions, res).then(result => {
        return res.status(200).send({result});
    })
    .catch(function (error) {
      next(createError(404));
    }));
  },
  getTeams: function(req, res, next) {
    return TeamData.find()
      .then(function(result) {
        return res.status(200).send({result});
      });
  },
  getTeam: function(req, res, next) {
    const id = req.params.id;
    return TeamData.find({id: id})
      .then(function(result) {
        return res.status(200).send({result});
      });
  },
  getPlayers: function(req, res, next) {
    return PlayerData.find()
      .then(function(result) {
        return res.status(200).send({result});
      });
  }
}

module.exports = tasksCtrl;
