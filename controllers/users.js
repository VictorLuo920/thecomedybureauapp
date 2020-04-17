const User = require('../models/user');
const Event = require('../models/event');


const show = (req, res, next) => {
  User.findById(req.user._id).populate('bookmarkedEvents').exec((err, user) => {
    res.render("profile", {user})
  })
};


const createNote = (req, res, next) => {

};
const edit = () => {};
const deleteNote = () => {};


module.exports = {
  show,
  createNote,
  edit,
  delete: deleteNote
};