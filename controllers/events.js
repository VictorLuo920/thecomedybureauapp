const request = require('request');
const rootURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=aAdFKybrpPXyG4rJqVZZMeBwLmxASYcP&radius=100&locale=*&countryCode=US&classificationId=KnvZfZ7vAe1&dmaId=324';
const Event = require('../models/event');
const User = require('../models/user')

const index = (req, res, next) => {
  const userData = User.findById(req.user);
  request(rootURL, (err, response, body) => {
    const eventsData = JSON.parse(body);
    res.render('events', {events: eventsData._embedded.events, user: userData});
  });
}
const bookmark = (req, res, next) => {
  Event.create(req.body, function (err, createdEvent) {
    User.findById(req.user._id, (err, userData) => {
      userData.bookmarkedEvents.push(createdEvent);
      userData.save();
      createdEvent.save();
    })
  });
  res.redirect('/');// I think I know ultimately this should end up in a res.redirect to either the main page, or to the user page showing their bookmarked events
}


module.exports = {
    index,
    bookmark
};