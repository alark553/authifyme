const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy;

const TWITTER_CONSUMER_KEY = "mamdfhjhhfjh";
const TWITTER_CONSUMER_SECRET = "jdshfgjhsdghg";


var express = require('express');
var app = express();

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    console.log("token, tokenSecret, profile ", token, tokenSecret, profile);
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }
));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.listen(process.argv[2]);
console.log('8080 is the magic port');

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));