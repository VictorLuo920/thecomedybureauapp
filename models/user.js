var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
    text: String
  }, {
    timestamps: true
  });

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    comments: [commentSchema],
    // events: [eventSchema], make array of references to the event model
    googleId: String
  }, {
    timestamps: true
  },);

module.exports = mongoose.model('User', userSchema);