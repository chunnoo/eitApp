const bcrypt = require('bcrypt');

const checkUserExistance = (pgPool, username) => {
  return pgPool
    .query({
      name: 'check-user-existance',
      text: `
        select
            username
        from eit.accounts
        where username = $1;`,
      values: [username]
    })
    .then(res => res.rows.length > 0);
};

const findIdByUsername = (pgPool, username) => {
  return pgPool.query({
    name: 'find-id-by-username',
    text: `
      select
          id
      from eit.accounts
      where
          username = $1;`,
    values: [username]
  });
};

const findUsernameById = (pgPool, id) => {
  return pgPool.query({
    name: 'find-username-by-id',
    text: `
      select
          username
      from eit.accounts
      where
          id = $1;`,
    values: [id]
  });
};

const registerUser = (pgPool, username, password) => {
  const saltedhash = bcrypt.hashSync(password, 10);
  return pgPool.query({
    name: 'register-user',
    text: `
      insert into eit.accounts(username, saltedhash) values
        ($1, $2);`,
    values: [username, saltedhash]
  });
};

const setPassword = (pgPool, username, password) => {
  const saltedhash = bcrypt.hashSync(password, 10);
  return pgPool.query({
    name: 'set-password',
    text: `
      update eit.accounts
      set
          saltedhash = $2
      where
          username = $1;`,
    values: [username, saltedhash]
  });
};

const verifyUserLogin = (pgPool, username, password, callback) => {
  pgPool
    .query({
      name: 'verify-user-login',
      text: `
        select
            saltedhash
        from eit.accounts
        where
            username = $1;`,
      values: [username]
    })
    .then(res => {
      if (res.rows.length === 0) {
        callback(false);
      } else {
        bcrypt
          .compare(password, res.rows[0].saltedhash)
          .then(res => callback(res))
          .catch(e => console.error(e.stack));
      }
    })
    .catch(e => console.error(e.stack));
};

exports.checkUserExistance = checkUserExistance;
exports.findIdByUsername = findIdByUsername;
exports.findUsernameById = findUsernameById;
exports.registerUser = registerUser;
exports.setPassword = setPassword;
exports.verifyUserLogin = verifyUserLogin;
