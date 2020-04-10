var router = require('express').Router();
// var usersCtrl = require('../controllers/users');

// function isLoggedIn(req, res, next) {
//     if ( req.isAuthenticated() ) return next();
//     res.redirect('/auth/google');
//   }

// // GET /students
// router.get('/students', studentsCtrl.index);

// // POST /facts
// // We will already have access to the logged in student on
// // the server, therefore do not use: /students/:id/facts (we do not need the id on the back end; it is provided front end wise. this is a logic thing to rememeber)
// router.post('/facts', isLoggedIn, studentsCtrl.addFact);

// // DELETE /facts/:id
// router.delete('/facts/:id', studentsCtrl.delFact);

module.exports = router;
