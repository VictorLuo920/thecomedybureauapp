var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
  text: String,
  userId: [{type: Schema.Types.ObjectId, ref: 'User'}],
  userName: String
}, {
  timestamps: true
});

var eventSchema = new mongoose.Schema({
    name: String,
    url: String,
    usersBookmarked: [{type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [commentSchema]
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Event', eventSchema);