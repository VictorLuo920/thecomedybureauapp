const request = require('request');
const rootURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=aAdFKybrpPXyG4rJqVZZMeBwLmxASYcP&radius=100&locale=*&countryCode=US&classificationId=KnvZfZ7vAe1&dmaId=324https://app.ticketmaster.com/discovery/v2/events.json?arts-theater?classificationId=KnvZfZ7vAe1&geoHash=9q5c&radius=100&sort=date%2Casc&unit=miles&daterange=all';


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
    eventDetails
  };