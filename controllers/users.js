const User = require('../models/user');
const Event = require('../models/event');


// shows the user profile page, making sure bookmarked events are properly referenced with .populate()
const show = (req, res, next) => {
  User.findById(req.user._id).populate('bookmarkedEvents').exec((err, user) => {
    res.render("profile", {user})
  })
};

// adds a comment and specifying its numerous UX restrictions: so that the comment is properly referenced to its specific bookmarked Event. 
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

// directs users to the comment edit page
const edit = (req, res, next) => {
  User.findById(req.user._id)
    .populate('bookmarkedEvents').exec(function(err, user) {
      res.render('edit', {user});
  });
};

// should be saving the edits that are loaded into the inputs, but figuring out how to push the req.body (text) into the text: string value in my notes schema...
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

// should be tied to an inline button that displays on the profile page that simply redirects or refreshes the profile page to show that the changes were made
const deleteNote = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body, // this update function should target the specific comment ID and splice it out of the array. would adding options help? 
    (err, updatedUser) => {
      console.log(req.user._id);
      res.redirect("/profile");
    }
  );
};


module.exports = {
  show,
  createNote,
  edit,
  update,
  delete: deleteNote
};
