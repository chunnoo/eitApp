const getPost = (pgPool, APIRes, postId) => {
  pgPool.query({
    name: 'get-post',
    text: 
      `select
        eit.posts.id as postid,
        eit.posts.content as content,
        eit.posts.imagepath as imagepath,
        eit.accounts.username as username,
        eit.challenges.name as challengename
      from
        eit.posts
      inner join eit.accounts
        on eit.posts.userid = eit.accounts.id
      inner join eit.challenges
        on eit.posts.challengeid = eit.challenges.id
      where
        eit.posts.id = $1`,
    values: [postId]
  })
    .then(res => APIRes.json(res.rows[0]))
    .catch(e => console.error(e));
};

const getPostsByUser = (pgPool, APIRes, userId) => {
  pgPool.query({
    name: 'get-posts-by-user',
    text: 
      `select
        *
      from eit.posts
      where userid = $1;`,
    values: [userId]
  })
    .then(res => APIRes.json(res.rows))
    .catch(e => console.error(e));
};

const getPostsByFollowing = (pgPool, APIRes, userId) => {
  pgPool.query({
    name: 'get-posts-by-following',
    text:
      `select
        eit.posts.id as postid,
        eit.posts.content as content,
        eit.posts.imagepath as imagepath,
        eit.accounts.username as username,
        eit.challenges.name as challengename
      from eit.posts
      inner join eit.follows
        on eit.posts.userid = eit.follows.followingid
      inner join eit.challenges
        on eit.posts.challengeid = eit.challenges.id
      inner join eit.accounts
        on eit.posts.userid = eit.accounts.id
      where
        eit.follows.followerid = $1;`,
    values: [userId]
  })
    .then(res => APIRes.json(res.rows))
    .catch(e => console.error(e))
};

const createPost = (pgPool, APIRes, userId, challengeId, content, imagepath) => {
  pgPool.query({
    name: "end-challenge",
    text:
      `delete from
        eit.activechallenges
      where
        userid = $1
      and
        challengeid = $2;`,
    values: [userId, challengeId]
  })
    .then(res => {
      pgPool.query({
        name: "create-post",
        text:
          `insert into eit.posts
            (userid, challengeid, posted, content, imagepath)
          values
            (
              $1,
              $2,
              now() at time zone 'Europe/Oslo',
              $3,
              $4
            )
          returning *;`,
        values: [userId, challengeId, content, imagepath]
      })
        .then(res => APIRes.json(res.rows[0]))
        .catch(e => console.error(e))
    })
    .catch(e => console.error(e));
};

exports.getPost = getPost;
exports.getPostsByUser = getPostsByUser;
exports.getPostsByFollowing = getPostsByFollowing;
exports.createPost = createPost;
