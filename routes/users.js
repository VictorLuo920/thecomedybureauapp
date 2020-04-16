const router = require('express').Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users');

// This is the function that should show my user profile page
router.get('/profile', usersCtrl.show)

// routes not yet defined
//         1) route to post note to user's profile page to make notes
//              - router.post('/:id', usersCtrl.create)
//         2) route to update that note on the event
//              - router.get(':/id', usersCtrl.edit)
//         3) route to delete that note on the event
//              - router.delete(':/id', usersCtrl.delete)
//         4) I really want to know that this is MVP at this point once done... crying...


const isLoggedIn = (req, res, next) => {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}


module.exports = router;
