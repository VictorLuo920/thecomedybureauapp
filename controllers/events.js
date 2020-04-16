const request = require('request');
const rootURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=aAdFKybrpPXyG4rJqVZZMeBwLmxASYcP&radius=100&locale=*&countryCode=US&classificationId=KnvZfZ7vAe1&dmaId=324';
const Event = require('../models/event');
const User = require('../models/user')


function index(req, res, next) {
  // const userData = User.findById(req.user.id);
  request(rootURL, (err, response, body) => {
    const eventsData = JSON.parse(body);
    res.render('events', {events: eventsData._embedded.events, user: userData});
  });
}

function bookmark(req, res) {
  console.log(req.body);

  Event.create(req.body, function (err, createdEvent) {
    User.findById(req.user._id, (err, userData) => {
      userData.bookmarkedEvents.push(createdEvent);
      userData.save();
      createdEvent.save();
    })
  });
  // What I'm trying to do above (what Taylor said), create the event to save it to our database, and also push the saved event to the User model...
  
  res.redirect('/events');

  // I think I know ultimately this should end up in a res.redirect to either the main page, or to the user page showing their bookmarked events

}

// search for one event, (in your utilties, files), go into your event Controller.

// // Did a bad thing here and tried to copy and paste code again...
// function bookmark(req, res) {
//     User.findById(req.params.id, function(err, user) {
//       // Ensure that user is not already in usersReading
//       // See "Finding a Subdocument" in https://mongoosejs.com/docs/subdocs.html
//       if (User.bookmarkedEvents.id(req.user._id)) return res.redirect('/events');
//       book.usersReading.push(req.event._id);
//       book.save(function(err) {
//         res.redirect(`/books/${user._id}`);
//       });
//     });
// }

// Notes about the indexing function
//    1) I am trying to display the data that I am consuming from the 3rd party API
//    2) I am also trying to save that data through my own data modeler, into my own database for the users to bookmark and make comments and notes. Or is this not the right part of the step to do it in?


module.exports = {
    index,
    bookmark
};