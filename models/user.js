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
    googleId: String
  }, {
    timestamps: true
  },);

module.exports = mongoose.model('User', userSchema);