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

const edit = (req, res, next) => {
  User.findById(req.user._id)
    .populate('bookmarkedEvents').exec(function(err, user) {
      res.render('edit', {user});
  });
};

const update = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body, //the req.body is text that ultimately should be set in the note.text field, if we're for looping to see into that ID again... shit...)
    (err, updatedUser) => {
      console.log(req.user._id);
      res.redirect("/profile");
    }
  );
};


const deleteNote = () => {};


module.exports = {
  show,
  createNote,
  edit,
  update,
  delete: deleteNote
};
