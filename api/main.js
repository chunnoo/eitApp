const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const expressSession = require('express-session');
const { Pool } = require('pg');
const pgSession = require('connect-pg-simple')(expressSession);

const initializeAuthentication = require('./initializeAuthentication.js');

const authenticationAPI = require('./requests/authentication.js');
const accountsAPI = require('./requests/accounts.js');
const challengesAPI = require('./requests/challenges.js');
const postsAPI = require('./requests/posts.js');

// Connect to database
const pgPool = new Pool({
  user: `${process.env.USER}`,
  host: "localhost",
  database: "eit",
  password: "",
  port: process.env.DB_PORT || 5432
});

const app = express();

initializeAuthentication(passport, pgPool);

// Static serve images
const _imgPath = "/../content/img";
app.use("/img", express.static(__dirname + _imgPath));

// Various middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: true,
  saveUninitialized: true,
  store: new pgSession({
    pool: pgPool,
    schemaName: 'eit'
  })
}));
app.use(passport.initialize());
app.use(passport.session());


// Middelware for only allowing authenticated post request
// Except for login and checkloginstatus
app.use((req, res, next) => {
  if (
    req.method !== "POST" ||
    req.path === '/api/login' ||
    req.path === '/api/checkloginstatus' ||
    req.user
  ) {
    next();
  } else {
    res.status(401).send("User not authenticated!");
  }
})

// If production: serve files from build folder
if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(__dirname, '../build')));

  // app.get([
  //   '/',
  //   '/page'
  // ], (req, res) => {
  //   res.sendFile(path.join(__dirname, '../build', 'index.html'));
  // });
} else if (process.env.NODE_ENV === "development") {

}

// Setup REST APIs
authenticationAPI.setup(app, passport);
accountsAPI.setup(app, pgPool);
challengesAPI.setup(app, pgPool);
postsAPI.setup(app, pgPool);

// Start Server
const nodeJsPort = process.env.NODEJS_PORT || 8080;
app.listen(nodeJsPort, () => {
  console.log(`Listening on port ${nodeJsPort}`);
});
