
const LocalStrategy = require('passport-local');

const authQueries = require('./queries/authentication.js')

const initializeAuthentication = (passport, pgPool) => {
    passport.serializeUser((username, done) => {
        authQueries.findIdByUsername(pgPool, username)
            .then(res => done(null, res.rows[0].id))
            .catch(e => console.error(e.stack));
    });
        
    passport.deserializeUser((id, done) => {
        authQueries.findUsernameById(pgPool, id)
            .then(res => done(null, res.rows[0].username))
            .catch(e => console.error(e.stack));
    });
        
    passport.use(new LocalStrategy((username, password, done) => {
        authQueries.verifyUserLogin(pgPool, username, password, (verified) => {
            if (verified) {
                done(null, username);
            } else {
                done(null, false, {errors: { 'username or password': 'is invalid' }});
            }
        })
    }));
}

module.exports = initializeAuthentication;
