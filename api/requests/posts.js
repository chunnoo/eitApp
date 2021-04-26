const queries = require('../queries/posts.js');

const setup = (app, pgPool) => {
  app.post('/api/getpost', (req, res) => {
    queries.getPost(pgPool, res, req.body.postid);
  });

  app.post('/api/getpostsbyuser', (req, res) => {
    if (req.body.userid) {
      queries.getPostsByUser(pgPool, res, req.body.userid);
    } else {
      queries.getPostsByUser(pgPool, res, req.session.passport.user);
    }
  });

  app.post('/api/getpostsbyfollowing', (req, res) => {
    queries.getPostsByFollowing(pgPool, res, req.session.passport.user);
  });

  app.post('/api/createpost', (req, res) => {
    queries.createPost(
      pgPool,
      res,
      req.session.passport.user,
      req.body.challengeid,
      req.body.content,
      req.body.imagepath
    );
  });
}

exports.setup = setup;
