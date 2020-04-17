const User = require('../models/user');
const Event = require('../models/event');


const show = (req, res, next) => {
  User.findById(req.user._id).populate('bookmarkedEvents').exec((err, user) => {
    res.render("profile", {user})
  })
};


const createNote = (req, res, next) => {
  Event.findOne({_id: req.params.id}, (err, event) => {
    User.findById(req.user._id, (err, userData) => {
      req.body.eventref = req.params.id;
      userData.notes.push(req.body);
      userData.save();
    })
  });
  res.redirect("/profile");
};
const edit = () => {};
const deleteNote = () => {};


module.exports = {
  show,
  createNote,
  edit,
  delete: deleteNote
};