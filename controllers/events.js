const request = require('request');
const rootURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=aAdFKybrpPXyG4rJqVZZMeBwLmxASYcP&radius=100&locale=*&countryCode=US&classificationId=KnvZfZ7vAe1&dmaId=324';
const Event = require('../models/event');


// Notes about the indexing function
//    1) I am trying to display the data that I am consuming from the 3rd party API
//    2) I am also trying to save that data through my own data modeler, into my own database for the users to bookmark and make comments and notes. Or is this not the right part of the step to do it in?

function index(req, res, next) {

  request(rootURL, (err, response, body) => {
    const eventsData = JSON.parse(body);
    res.render('events', {events: eventsData._embedded.events});
    // console.log(eventsData._embedded.events);
    // res.send('check console for API data');
  
  });

}





// function show(req, res) {
//   Movie.findById(req.params.id)
//   .populate('cast').exec(function(err, movie) {
//     // Performer.find({}).where('_id').nin(movie.cast)
//     Performer.find(
//      {_id: {$nin: movie.cast}},
//      function(err, performers) {
//        console.log(performers);
//        res.render('movies/show', {
//          title: 'Movie Detail', movie, performers
//        });
//      }
//    );
//   });
// }



function eventDetails(req, res) {
    const username = req.query.username;
    if (!username) return res.render('index', {userData: null});
    const options = {
      url: rootURL + 'users/' + username,
      headers: {
        'User-Agent': 'jim-clark',
        'Authorization': 'token ' + process.env.GITHUB_TOKEN
      }
    };
    request(options, function(err, response, body) {
      const userData = JSON.parse(body);
      // update the options url to fetch the user's repos
      options.url = userData.repos_url;
      request(options, function(err, response, body) {
        // add a repos property
        try {
          userData.repos = JSON.parse(body);
          res.render('index', {userData});
        } catch {
          res.redirect('/');
        }
      });
    });
  }

  module.exports = {
    eventDetails,
    index
  };