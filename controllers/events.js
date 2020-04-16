const request = require('request');
const rootURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=aAdFKybrpPXyG4rJqVZZMeBwLmxASYcP&radius=100&locale=*&countryCode=US&classificationId=KnvZfZ7vAe1&dmaId=324';
const Event = require('../models/event');
const User = require('../models/user')

const index = (req, res, next) => {
  const userData = User.findById(req.params.id);
  request(rootURL, (err, response, body) => {
    const eventsData = JSON.parse(body);
    for (event = 0; event < eventsData._embedded.events.length; event++) {
      Event.findOneAndUpdate(
        {ticketmasterId: eventsData._embedded.events[event].id}, 
        eventsData._embedded.events[event], 
        {new: true, upsert: true},
        (err, event) => {
          console.log("finished")
          // event.save();
        }
      )
    };
    res.render('events', {events: eventsData._embedded.events, user: userData});
  });
}

const bookmark = (req, res, next) => {
  Event.findOneAndUpdate({ticketmasterId: req.params.id}, (err, event) => {
    User.findById(req.user._id, (err, userData) => {
      userData.bookmarkedEvents.push(event);
      userData.save();
    })
  });
  res.redirect('/events');
}

// I think I know ultimately this should end up in a res.redirect to either the main page, or to the user page showing their bookmarked events

module.exports = {
    index,
    bookmark
};