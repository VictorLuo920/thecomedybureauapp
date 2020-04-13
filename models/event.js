var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name: String,
    url: String,
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Event', eventSchema);