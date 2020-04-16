const User = require('../models/user');



const show = (req, res, next) => {
  // res.send('this is working');
  // User.findById(req.params.id, (err, user) => {
  //   res.render('users/show', {user})
  // });
  User.findById(req.params.id, function(err, user) {
    if (err) return (err);
    res.render("show", { 
        user: req.user }); 
  });
}

const create = () => {};
const edit = () => {};
const deleteNote = () => {};


module.exports = {
  show,
  create,
  edit,
  delete: deleteNote
};