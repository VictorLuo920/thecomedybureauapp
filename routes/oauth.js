var express = require('express');
var router = express.Router();
var passport = require('passport')


router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/events',
    failureRedirect : '/events'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/events');
});

module.exports = router;
