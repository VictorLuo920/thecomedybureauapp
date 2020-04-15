const request = require('request');
const rootURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=aAdFKybrpPXyG4rJqVZZMeBwLmxASYcP&radius=100&locale=*&countryCode=US&classificationId=KnvZfZ7vAe1&dmaId=324';
const Event = require('../models/event');
const User = require('../models/user')


// Notes about the indexing function
//    1) I am trying to display the data that I am consuming from the 3rd party API
//    2) I am also trying to save that data through my own data modeler, into my own database for the users to bookmark and make comments and notes. Or is this not the right part of the step to do it in?

function index(req, res, next) {
  request(rootURL, (err, response, body) => {
    const eventsData = JSON.parse(body);
    res.render('events', {events: eventsData._embedded.events});
  });
}

function bookmark(req, res) {
  res.send("this is working");
}

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


module.exports = {
    index,
    bookmark
};