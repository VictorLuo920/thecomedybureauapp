const User = require('../models/user');



function show(req, res, next) {
  // User.findById(req.params.id).exec(function(err, movie) {});
  // console.log(req.query);
  res.send('Check the console!')
}


module.exports = {
  show,
};