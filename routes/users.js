const router = require('express').Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users');


// O-Auth below
router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect : '/',
      failureRedirect : '/'
    }
));
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

const isLoggedIn = (req, res, next) => {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}


// This is the function that should show my user profile page
router.get('/profile', isLoggedIn, usersCtrl.show)
router.post('/:id', usersCtrl.createNote)

// routes not yet defined
//         1) route to post note to user's profile page to make notes
//              - router.post('/:id', usersCtrl.create)
//         2) route to update that note on the event
//              - router.get(':/id', usersCtrl.edit)
//         3) route to delete that note on the event
//              - router.delete(':/id', usersCtrl.delete)
//         4) I really want to know that this is MVP at this point once done... crying...




module.exports = router;
