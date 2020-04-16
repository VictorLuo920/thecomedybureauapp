const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new mongoose.Schema({
    text: String
  }, {
    timestamps: true
  });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    notes: [noteSchema], // find some way to embed this into the bookmarked events
    bookmarkedEvents: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    // recentPosts: [{type: Schema.Types.ObjectId.comments, ref: 'Event'}] // not sure how to do this to refer to the embedded posts of another, but this is probably an extra feature to add later down the ice box
  }, {
    timestamps: true
  },);

module.exports = mongoose.model('User', userSchema);