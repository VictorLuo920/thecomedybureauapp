const User = require('../models/user');



function show(req, res, next) {
  res.send('this is working');
  // User.findById(req.params.id, (err, user) => {
  //   res.render('users', {user})
  // });
}


module.exports = {
  show,
};