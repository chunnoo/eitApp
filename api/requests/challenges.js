const queries = require('../queries/challenges.js');

const setup = (app, pgPool) => {
  app.post('/api/getallchallenges', (req, res) => {
    queries.getAllChallenges(pgPool, res);
  });

  app.post('/api/getchallenge', (req, res) => {
    queries.getChallenge(pgPool, res, req.body.challengeid);
  });
  
  app.post('/api/getactivechallenges', (req, res) => {
    if (req.body.userid) {
      queries.getActiveChallenges(pgPool, res, req.body.userid);
    } else {
      queries.getActiveChallenges(pgPool, res, req.session.passport.user);
    }
  });

  app.post('/api/activatechallenge', (req, res) => {
    queries.activateChallenge(pgPool, res, req.session.passport.user, req.body.challengeid);
  });

  app.post('/api/sendchallenge', (req, res) => {
    queries.sendChallenge(pgPool, res, req.session.passport.user, req.body.receiverid, req.body.challengeid);
  });

  app.post('/api/getrankedusers', (req, res) => {
    queries.getRankedUsers(pgPool, res);
  });
}

exports.setup = setup;
