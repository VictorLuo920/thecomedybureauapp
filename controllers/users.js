const User = require('../models/user');



const show = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return (err);
    res.render("profile", { 
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