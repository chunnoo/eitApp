const getUser = (pgPool, APIRes, userId) => {
  pgPool.query({
    name: "get-user",
    text:
      `select
        *
      from eit.accounts
      where
        id = $1;`,
    values: [userId]
  })
    .then(res => APIRes.json(res.rows[0]))
    .catch(e => console.error(e));
};

const getUserInfo = (pgPool, APIRes, userId) => {
  pgPool.query({
    name: "get-user-info",
    text: // TODO: implement
      `select
        *
      from eit.accounts
      where
        id = $1;`,
    values: [userId]
  })
    .then(res => APIRes.json(res.rows[0]))
    .catch(e => console.error(e));
};

const getFollowers = (pgPool, APIRes, userId) => {
  pgPool.query({
    name: "get-followers",
    text:
      `select
        eit.accounts.id as userid,
        eit.accounts.username as username,
        eit.accounts.imagepath as imagepath
      from
        eit.account
      inner join
        eit.follows
        on eit.accounts.id = eit.follows.followerid
      where
        eit.followingid = $1;`,
    values: [userId]
  })
    .then(res => APIRes.json(res.rows))
    .catch(e => console.error(e));
};

const getFollowings = (pgPool, APIRes, userId) => {
  pgPool.query({
    name: "get-followings",
    text:
      `select
        eit.accounts.id as userid,
        eit.accounts.username as username,
        eit.accounts.imagepath as imagepath
      from
        eit.account
      inner join
        eit.follows
        on eit.accounts.id = eit.follows.followingid
      where
        eit.followerid = $1;`,
    values: [userId]
  })
    .then(res => APIRes.json(res.rows))
    .catch(e => console.error(e));
};

exports.getUser = getUser;
exports.getFollowers = getFollowers;
exports.getFollowings = getFollowings;
