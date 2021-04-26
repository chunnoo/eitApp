const getAllChallenges = (pgPool, APIRes) => {
  pgPool.query({
    name: 'get-all-challenges',
    text: 
      `select
        *
      from eit.challenges;`
  })
    .then(res => APIRes.json(res.rows))
    .catch(e => console.error(e));
};

const getChallenge = (pgPool, APIRes, challengeId) => {
  pgPool.query({
    name: 'get-challenge',
    text: 
      `select
        *
      from eit.challenges
      where
        id = $1;`,
    values: [challengeId]
  })
    .then(res => APIRes.json(res.rows[0]))
    .catch(e => console.error(e));
};

const getActiveChallenges = (pgPool, APIRes, userId) => {
  pgPool.query({
    name: 'get-active-challenge',
    text: 
      `select
        eit.challenges.id as id,
        eit.challenges.name as name,
        eit.challenges.description as description,
        eit.challenges.info as info,
        eit.challenges.points as points,
        eit.challenges.imagepath as imagepath
      from eit.challenges
      inner join eit.activechallenges
        on eit.challenges.id = eit.activechallenges.challengeid
      where
        eit.activechallenges.userid = $1;`,
    values: [userId]
  })
    .then(res => APIRes.json(res.rows))
    .catch(e => console.error(e));
};

// TODO: Make sure challenge is not already activated
const activateChallenge = (pgPool, APIRes, userId, challengeId) => {
  pgPool.query({
    name: "activate-challenge",
    text:
      `insert into
        eit.activechallenges
      values
        (
          $1,
          $2,
          now() at time zone 'Europe/Oslo'
        )
      returning
        userid,
        challengeid,
        started;`,
      values: [userId, challengeId]
  })
    .then(res => APIRes.json(res.rows[0]))
    .catch(e => console.error(e));
};

const sendChallenge = (pgPool, APIRes, senderId, receiverId, challengeId, message) => {
  pgPool.query({
    name: "send-challenge",
    text:
      `insert into
        eit.sentchallenges
      values
        (
          $1,
          $2,
          $3,
          $4
        )
      returning
        senderid,
        receiverid,
        challengeid,
        message;`,
    values: [senderId, receiverId, challengeId, message]
  })
    .then(res => APIRes.json(res.rows[0]))
    .catch(e => console.error(e));
};

const getRankedUsers = (pgPool, APIRes) => {
  pgPool.query({
    name: 'get-ranked-users',
    text: 
      `select
        eit.accounts.id as userid,
        eit.accounts.username,
        sum(eit.challenges.points) as score
      from eit.accounts
      left join eit.posts
        on eit.accounts.id = eit.posts.userid
      left join eit.challenges
        on eit.posts.challengeid = eit.challenges.id
      group by eit.accounts.id
      order by score desc;`
  })
    .then(res => APIRes.json(res.rows))
    .catch(e => console.error(e));
};

exports.getAllChallenges = getAllChallenges;
exports.getChallenge = getChallenge;
exports.getActiveChallenges = getActiveChallenges;
exports.activateChallenge = activateChallenge;
exports.sendChallenge = sendChallenge;
exports.getRankedUsers = getRankedUsers;
