const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/database.js');
const passport = require('passport');
const session = require('express-session');
const { ServerClosedEvent } = require('mongodb');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 7000;
const app = express();

app
.use(bodyParser.json())
.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))
//this is the basic express session({..}) initialization
.use(passport.initialize())
//init passport on every route call
.use(passport.session())
//allow passport to use "express-session"
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(  //test
      'Access-Control-Allow-Heaters',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
.use(cors({methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
.use(cors({origin: '*'}))
.use("/", require("./routes"))

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  // UserActivation.findorCreate({ githubId: profile.id}, function (err, user) {
return done(null, profile);
  // })
}
));

passport.serializeUser((user, done) =>{
  done(null, user);
});
passport.deserializeUser((user, done) =>{
  done(null, user);
});

app.get('/', (req,res)=> {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : `Logged Out`)});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on port ${port}`)
        });
   }
    
});

