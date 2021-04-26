const queries = require('../queries/accounts.js');

const setup = (app, pgPool) => {
  app.post('/api/getuser', (req, res) => {
    if (req.body.userid) {
      queries.getUser(pgPool, res, req.body.userid);
    } else {
      queries.getUser(pgPool, res, req.session.passport.user);
    }
  });
  
  app.post('/api/getfollowers', (req, res) => {
    queries.getFollowers(pgPool, res, req.session.passport.user);
  });

  app.post('/api/getfollowings', (req, res) => {
    queries.getFollowings(pgPool, res, req.session.passport.user);
  });
}

exports.setup = setup;
