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


router.get('/profile', isLoggedIn, usersCtrl.show)
router.post('/:id', usersCtrl.createNote)
router.get('/profile/edit', usersCtrl.edit)
router.put('/:id', usersCtrl.update)
router.delete('/:id', usersCtrl.delete)

module.exports = router;
