const User = require('../models/user');

module.exports = {
  index,
  addComment,
  delComment
};

function index(req, res, next) {
  console.log(req.query)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('students/index', { students, user: req.user, name: req.query.name, sortKey });
  });
}

function addComment(req, res, next) {
  req.user.facts.push(req.body); // this is actually restricting it to only that student, because .Find would manipulate others...
  req.user.save(function(err) {
    res.redirect('/students');
  });
}

function delComment(req, res, next) {

}
